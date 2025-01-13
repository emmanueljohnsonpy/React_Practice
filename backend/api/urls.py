from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-node"),
    path("profile/", views.UserProfile.as_view(), name="user-profile"),
    # path('admin-login/', views.AdminLoginView.as_view(), name='admin-login'),
    # path('admin/users/', views.AllUsersView.as_view(), name='admin-users-list'),
]