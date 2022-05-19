from django.contrib import admin
from .models import Thread

class ThreadAdmin(admin.ModelAdmin):
    list_display = ('author', 'content', 'id', 'status', 'created')
    
admin.site.register(Thread, ThreadAdmin)
