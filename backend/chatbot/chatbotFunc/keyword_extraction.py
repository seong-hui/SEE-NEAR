import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)

import numpy as np
from sklearn.preprocessing import normalize

#pagerank
#Reference : https://eyeballs.tistory.com/36 

def pagerank(x, df=0.85, max_iter=30, bias=None):
    """
    Arguments
    ---------
    x : scipy.sparse.csr_matrix
        shape = (n vertex, n vertex)
    df : float
        Damping factor, 0 < df < 1
    max_iter : int
        Maximum number of iteration
    bias : numpy.ndarray or None
        If None, equal bias

    Returns
    -------
    R : numpy.ndarray
        PageRank vector. shape = (n vertex, 1)
    """
    #df가 0~1사이라면

    assert 0 < df < 1

    # initialize (정규화, 벡터 초기화)
    A = normalize(x, axis=0, norm='l1')
    R = np.ones(A.shape[0]).reshape(-1,1)

    # bias는 우선순위 (알고리즘에 따라/init + 갱신)
    if bias is None:
        bias = (1 - df) * np.ones(A.shape[0]).reshape(-1,1)
    else:
        bias = bias.reshape(-1,1)
        bias = A.shape[0] * bias / bias.sum()
        assert bias.shape[0] == A.shape[0]
        bias = (1 - df) * bias

    # iteration (계속 갱신)
    for _ in range(max_iter):
        R = df * (A * R) + bias

    return R

from collections import Counter
from scipy.sparse import csr_matrix
import numpy as np


#vocab 설정대로 scan해주기 (index까지)
def scan_vocabulary(sents, tokenize=None, min_count=2):
    """
    Arguments
    ---------
    sents : list of str
        Sentence list
    tokenize : callable
        tokenize(str) returns list of str
    min_count : int
        Minumum term frequency

    Returns
    -------
    idx_to_vocab : list of str
        Vocabulary list
    vocab_to_idx : dict
        Vocabulary to index mapper.
    """
    counter = Counter(w for sent in sents for w in tokenize(sent))
    counter = {w:c for w,c in counter.items() if c >= min_count}
    idx_to_vocab = [w for w, _ in sorted(counter.items(), key=lambda x:-x[1])]
    vocab_to_idx = {vocab:idx for idx, vocab in enumerate(idx_to_vocab)}
    return idx_to_vocab, vocab_to_idx

#토근화하기 (각 문장을 읽고 토큰화로 받아주기)
def tokenize_sents(sents, tokenize):
    """
    Arguments
    ---------
    sents : list of str
        Sentence list
    tokenize : callable
        tokenize(sent) returns list of str (word sequence)

    Returns
    -------
    tokenized sentence list : list of list of str
    """
    return [tokenize(sent) for sent in sents]

#vectorize하기 
def vectorize(tokens, vocab_to_idx):
    """
    Arguments
    ---------
    tokens : list of list of str
        Tokenzed sentence list
    vocab_to_idx : dict
        Vocabulary to index mapper

    Returns
    -------
    sentence bow : scipy.sparse.csr_matrix
        shape = (n_sents, n_terms)
    """
    rows, cols, data = [], [], []
    for i, tokens_i in enumerate(tokens):
        for t, c in Counter(tokens_i).items():
            j = vocab_to_idx.get(t, -1)
            if j == -1:
                continue
            rows.append(i)
            cols.append(j)
            data.append(c)
    n_sents = len(tokens)
    n_terms = len(vocab_to_idx)
    x = csr_matrix((data, (rows, cols)), shape=(n_sents, n_terms))
    return x


class KeywordSummarizer:
    """
    Arguments
    ---------
    sents : list of str
        Sentence list
    tokenize : callable
        Tokenize function: tokenize(str) = list of str
    min_count : int
        Minumum frequency of words will be used to construct sentence graph
    window : int
        Word cooccurrence window size. Default is -1.
        '-1' means there is cooccurrence between two words if the words occur in a sentence
    min_cooccurrence : int
        Minimum cooccurrence frequency of two words
    vocab_to_idx : dict or None
        Vocabulary to index mapper
    df : float
        PageRank damping factor
    max_iter : int
        Number of PageRank iterations
    verbose : Boolean
        If True, it shows training progress
    """
    #초기화 (한번 train_textrank)
    def __init__(self, sents=None, tokenize=None, min_count=2,
        window=-1, min_cooccurrence=2, vocab_to_idx=None,
        df=0.85, max_iter=30, verbose=False):

        self.tokenize = tokenize
        self.min_count = min_count
        self.window = window
        self.min_cooccurrence = min_cooccurrence
        self.vocab_to_idx = vocab_to_idx
        self.df = df
        self.max_iter = max_iter
        self.verbose = verbose

        #sents가 있다면 일단 textrank(graph R만들어주기)
        if sents is not None:
            self.train_textrank(sents)

            
    #train_textrank해주기(graph R만들어주기) (init과정, summarize과정)
    def train_textrank(self, sents, bias=None):
        """
        Arguments
        ---------
        sents : list of str
            Sentence list
        bias : None or numpy.ndarray
            PageRank bias term

        Returns
        -------
        None
        """
        #graph 및 인덱스 만들기 
        g, self.idx_to_vocab = word_graph(sents,
            self.tokenize, self.min_count,self.window,
            self.min_cooccurrence, self.vocab_to_idx, self.verbose)
        
        #pagerank 해주기(각 G의 노드마다 가중치 줄 것)
        self.R = pagerank(g, self.df, self.max_iter, bias).reshape(-1)
        
        #순서대로 출력해주기 (결과값 R 가중치그래프)
        if self.verbose:
            print('trained TextRank. n words = {}'.format(self.R.shape[0]))

    #키워드 추출
    def keywords(self, topk=30):
        """
        Arguments
        ---------
        topk : int
            Number of keywords selected from TextRank

        Returns
        -------
        keywords : list of tuple
            Each tuple stands for (word, rank)
        """
        #R이 없다면
        if not hasattr(self, 'R'):
            raise RuntimeError('Train textrank first or use summarize function')
        
        #R이 있다면 순서대로 정렬하기
        idxs = self.R.argsort()[-topk:]
        
        #인덱스화해서 키워드 리스트 저장하기
        keywords = [(self.idx_to_vocab[idx], self.R[idx]) for idx in reversed(idxs)]
        return keywords

    
    #추출해주기(train_textrank -> keywords)
    def summarize(self, sents, topk=30):
        """
        Arguments
        ---------
        sents : list of str
            Sentence list
        topk : int
            Number of keywords selected from TextRank

        Returns
        -------
        keywords : list of tuple
            Each tuple stands for (word, rank)
        """
        self.train_textrank(sents)
        return self.keywords(topk)
    
    
from collections import defaultdict
from scipy.sparse import csr_matrix


#graph G만들기
def word_graph(sents, tokenize=None, min_count=2, window=2,
    min_cooccurrence=2, vocab_to_idx=None, verbose=False):
    """
    Arguments
    ---------
    sents : list of str
        Sentence list
    tokenize : callable
        tokenize(str) returns list of str
    min_count : int
        Minumum term frequency
    window : int
        Co-occurrence window size
    min_cooccurrence : int
        Minimum cooccurrence frequency
    vocab_to_idx : dict
        Vocabulary to index mapper.
        If None, this function scan vocabulary first.
    verbose : Boolean
        If True, verbose mode on

    Returns
    -------
    co-occurrence word graph : scipy.sparse.csr_matrix
    idx_to_vocab : list of str
        Word list corresponding row and column
    """
    #인덱스 설정안되어있다면, vocab scan해주고, (단어-인덱스 매핑)
    if vocab_to_idx is None:
        idx_to_vocab, vocab_to_idx = scan_vocabulary(sents, tokenize, min_count)
    #설정되어있었다면 정렬해주기
    else:
        idx_to_vocab = [vocab for vocab, _ in sorted(vocab_to_idx.items(), key=lambda x:x[1])]
    
    #각 문장을 단어별로 토큰화
    tokens = tokenize_sents(sents, tokenize)
    #그래프(노드-엣지) 만들기(토큰화된 문장, 단어인덱스 매핑, min_occurrence 까지 고려해서)
    g = cooccurrence(tokens, vocab_to_idx, window, min_cooccurrence, verbose)
    return g, idx_to_vocab


#TextRank 에서 두 단어 간의 유사도를 정의하기 위해서는 두 단어의 co-occurrence 를 계산해야함
#각 문장을 순회하면서 각 단어의 공기 빈도를 계산, 윈도우 크기 내에 있는 단어들과의 공기 빈도를 계산
#공기 빈도가 최소 공기 빈도 이상인 경우에 대해서만 빈도를 저장, 공기 행렬을 생성

def cooccurrence(tokens, vocab_to_idx, window=2, min_cooccurrence=2, verbose=False):
    """
    Arguments
    ---------
    tokens : list of list of str
        Tokenized sentence list
    vocab_to_idx : dict
        Vocabulary to index mapper
    window : int
        Co-occurrence window size
    min_cooccurrence : int
        Minimum cooccurrence frequency
    verbose : Boolean
        If True, verbose mode on

    Returns
    -------
    co-occurrence matrix : scipy.sparse.csr_matrix
        shape = (n_vocabs, n_vocabs)
    """
    counter = defaultdict(int)
    for s, tokens_i in enumerate(tokens):
        if verbose and s % 1000 == 0:
            print('\rword cooccurrence counting {}'.format(s), end='')
        vocabs = [vocab_to_idx[w] for w in tokens_i if w in vocab_to_idx]
        n = len(vocabs)
        for i, v in enumerate(vocabs):
            if window <= 0:
                b, e = 0, n
            else:
                b = max(0, i - window)
                e = min(i + window, n)
            for j in range(b, e):
                if i == j:
                    continue
                counter[(v, vocabs[j])] += 1
                counter[(vocabs[j], v)] += 1
    counter = {k:v for k,v in counter.items() if v >= min_cooccurrence}
    n_vocabs = len(vocab_to_idx)
    if verbose:
        print('\rword cooccurrence counting from {} sents was done'.format(s+1))
    return dict_to_mat(counter, n_vocabs, n_vocabs)


#각 키와 값을 갖고 오는 희소행렬
def dict_to_mat(d, n_rows, n_cols):
    """
    Arguments
    ---------
    d : dict
        key : (i,j) tuple
        value : float value

    Returns
    -------
    scipy.sparse.csr_matrix
    """
    rows, cols, data = [], [], []
    for (i, j), v in d.items():
        rows.append(i)
        cols.append(j)
        data.append(v)
    return csr_matrix((data, (rows, cols)), shape=(n_rows, n_cols))

from konlpy.tag import Komoran

komoran = Komoran()
def komoran_tokenizer(sent):
    words = komoran.pos(sent, join=True)
    words = [w for w in words if ('/NN' in w or '/XR' in w or '/VA' in w or '/VV' in w)]
    return words

# with open('backend/media/text.txt', "r", encoding='utf-8') as f:
#     sents = f.readlines()
# print(sents)

# summarizer = KeywordSummarizer(tokenize=komoran_tokenizer, min_count=2, min_cooccurrence=1)
# test = summarizer.summarize(sents, topk=1)
# print(test)

def keyword_extraction(sents):
    summarizer = KeywordSummarizer(tokenize=komoran_tokenizer, min_count=2, min_cooccurrence=1)
    test = summarizer.summarize(sents, topk=1)  
    return test