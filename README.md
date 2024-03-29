# SEE-NEAR

- 처음 개발 시작
    1. git pull
    2. git branch (현재 branch 확인)
    3. git chechout <branch_name> (branch 이동)
    4-a. git branch <branch_name> (brach 생성) -> git branch checkout <branch_name> (branch 이동)
    4-b. git checkout -b <branch_name> (brach 생성 후 이동)
    - 항상 새로운 branch를 생성 후 작업

- 개발 완료
    1. git add . (파일 스테이징)
    2. git commit -m "commit_message" (파일 커밋)
    3. git push --set-upstream origin <branch_name> (파일 원격저장소로 올림, 현재 branch로)
    
    -개발 완료 (github)
        1. pull request
        2. 피드백 받고
        3. merge
    -개발 완료 (local)
        1. git checkout dev (dev branch로 이동)
        2. git branch -d <branch_name> (생성한 브랜치 삭제)
