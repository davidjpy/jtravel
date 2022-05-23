from django.contrib import admin
from .models import Account
from django.contrib.auth.admin import UserAdmin

class AccountAdminConfig(UserAdmin):
    search_fields = ('email', 'username', 'name')
    ordering = ('-start_date',)
    list_display = ('id', 'username', 'email', 'is_staff', 'is_superuser', 'is_active', 'last_login')
    list_filter = ('is_active', 'is_staff', 'is_superuser')
    readonly_fields=('last_login',)

    fieldsets = (
        ('Personal Information', {'fields': ('email', 'username', 'name', 'profile_image', 'about')}),
        ('Credential Informations', {'fields': ('password',)}),
        ('Permissions', {'fields': ('is_staff', 'is_superuser', 'is_active')}),
        ('Others', {'fields': ('start_date', 'last_login')}),
    )

    add_fieldsets = (
        (
            None,
            {
                'classes': ('wide',),
                'fields': (
                    'id',
                    'email',
                    'username',
                    'name',
                    'profile_image',
                    'about',
                    'password',
                    'is_staff',
                    'is_superuser',
                    'is_active',
                    'last_login'
                ),
            },
        ),
    )


admin.site.register(Account, AccountAdminConfig)

