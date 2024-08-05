from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import User, Family, Routine

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ("username", "password", "email", "first_name", "last_name", "phone_number", "birth", "is_senior")

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
        user.role = data.get("role", user.role)
        user.save()

class FamilySerializer(serializers.ModelSerializer):
    class Meta:
        model = Family
        fields = '__all__'
        read_only_fields = ("id",)
        
    def create(self, user):
        new_family = Family.objects.create(
            senior_id = user,
            senior_birth = user.birth,
        )
        new_family.save()
    
    def update(self, family, data):
        family.senior_birth = data.get("senior_birth", family.senior_birth)
        family.senior_id.birth = data.get("senior_birth", family.senior_id.birth)
        family.senior_gender = data.get("senior_gender", family.senior_gender)
        family.senior_diseases = data.get("senior_diseases", family.senior_diseases)
        family.senior_interests = data.get("senior_interests", family.senior_interests)
        family.save()
        family.senior_id.save()
        
class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "last_name", "first_name", "role")

class RoutineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Routine
        fields = ("id", "name", "time")

    def create(self, family):
        family = Family.objects.get(id=family)
        new_routine = Routine.objects.create(
            family_id = family,
            name = self.validated_data["name"],
            time = self.validated_data["time"]
        )
        new_routine.save()