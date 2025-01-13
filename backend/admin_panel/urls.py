from django.urls import path
from .views import AdminLoginView, AdminUserListView, AdminUserUpdateView, AdminUserDeleteView

urlpatterns = [
    path('login/', AdminLoginView.as_view(), name='admin-login'),
    path('users/', AdminUserListView.as_view(), name='admin-user-list'),
    path('users/<int:user_id>/edit/', AdminUserUpdateView.as_view(), name='admin-user-edit'), 
    path('users/<int:user_id>/delete/', AdminUserDeleteView.as_view(), name='admin-user-delete'),
    path('admin/users/search/<str:search_term>/', AdminUserListView.as_view(), name='admin_user_search'),  # Using path parameter
]
