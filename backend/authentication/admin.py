from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Family, Routine
from events.models import Event

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    fieldsets = [
        (None, {'fields': ('username', 'password')}),
        ('info', {'fields': ('first_name', 'last_name', 'email', 'phone_number', 'birth')}),
        ('family', {'fields': ('family_id', 'is_senior', 'role')}),
        ('admin', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        ('datetime', {'fields': ('last_login', 'date_joined')}),
    ]

class UserInLine(admin.TabularInline):
    model = User
    extra = 0

    fieldsets = [
        (None, {'fields': ['username', 'role', 'first_name', 'last_name']})
    ]

class RoutineInLine(admin.TabularInline):
    model = Routine
    extra = 0

    fieldsets = [
        (None, {'fields': ['name', 'time']})
    ]

class EventInLine(admin.TabularInline):
    model = Event
    extra = 0

    fieldsets = [
        (None, {'fields': ['title', 'location', 'datetime']})
    ]


class FamilyAdmin(admin.ModelAdmin):
    list_display = ['id', 'senior_id']
    inlines = [
        UserInLine,
        EventInLine,
        RoutineInLine
    ]
    fieldsets = [
        (None, {'fields': ('senior_id',)}),
        ('info', {'fields': ('senior_birth', 'senior_gender', 'senior_diseases', 'senior_interests')}),
    ]

admin.site.register(Family, FamilyAdmin)