from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import User, Family

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "first_name", "last_name", "phone_number", "birth", "is_senior")
        read_only_fields = ("id",)
        extra_kwargs = {'password': {'write_only': True}}

    def save(self, **kwargs):
        new_user = User.objects.create_user(
            username = self.validated_data.get('username'),
            email = self.validated_data.get('email'),
            first_name = self.validated_data.get('first_name'),
            last_name = self.validated_data.get('last_name'),
            phone_number = self.validated_data.get('phone_number'),
            birth = self.validated_data.get('birth'),
            is_senior = self.validated_data.get('is_senior')
        )
        new_user.set_password(self.validated_data.get('password'))
        new_user.save()
        new_token = Token.objects.create(user=new_user)

    def join(self, user, data):
        family = Family.objects.get(id=data.get("family_id"))
        user.family_id = family
        user.role = data.get("role")
        user.save()

class FamilySerializer(serializers.ModelSerializer):
    class Meta:
        model = Family
        fields = ("id", "family_name", "senior_id", "senior_birth", "senior_gender", "senior_diseases", "senior_interests")
        read_only_fields = ("id",)
        
    def create(self, user):
        new_family = Family.objects.create(
            family_name = self.validated_data.get("family_name"),
            senior_id = user,
            senior_birth = user.birth,
            senior_gender = self.validated_data.get("senior_gender"),
            senior_diseases = self.validated_data.get("senior_diseases"),
            senior_interests = self.validated_data.get("senior_interests")
        )
        new_family.save()

        return new_family