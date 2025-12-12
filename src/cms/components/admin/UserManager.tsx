import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { UserService } from '../../services/userService';
import { User } from '../../types/user';

const UserManager: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // 获取所有用户
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const userList = await UserService.getAllUsers();
        setUsers(userList);
        setError(null);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('获取用户列表失败');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // 处理编辑用户
  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  // 处理关闭模态框
  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingUser(null);
  };

  // 处理保存用户
  const handleSaveUser = async (updatedUser: Partial<User>) => {
    if (!editingUser) return;

    try {
      await UserService.updateUser(editingUser.id, updatedUser);
      // 更新本地状态
      setUsers(users.map(user => 
        user.id === editingUser.id ? { ...user, ...updatedUser } as User : user
      ));
      handleCloseModal();
    } catch (err) {
      console.error('Error updating user:', err);
      setError('更新用户失败');
    }
  };

  // 处理删除用户
  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('确定要删除这个用户吗？')) {
      return;
    }

    try {
      await UserService.deleteUser(userId);
      // 更新本地状态
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('删除用户失败');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400">加载中...</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/30 border border-white/10 rounded-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-slate-100">用户管理</h2>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-800 text-red-400 px-4 py-3 rounded-sm mb-6">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">用户</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">邮箱</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">角色</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">注册时间</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="h-8 w-8 rounded-full mr-3"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-slate-700 mr-3 flex items-center justify-center">
                        <span className="text-slate-400 text-sm">{user.name.charAt(0)}</span>
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-medium text-slate-100">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-400">
                  {user.email}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.role === 'admin' 
                      ? 'bg-emerald-900/50 text-emerald-400' 
                      : user.role === 'editor' 
                        ? 'bg-blue-900/50 text-blue-400'
                        : 'bg-slate-700 text-slate-300'
                  }`}>
                    {user.role === 'admin' ? '管理员' : user.role === 'editor' ? '编辑者' : '作者'}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-400">
                  {user.createdAt.toLocaleDateString()}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="text-emerald-400 hover:text-emerald-300 mr-3"
                  >
                    编辑
                  </button>
                  {currentUser?.id !== user.id && (
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      删除
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 编辑用户模态框 */}
      {showEditModal && editingUser && (
        <EditUserModal 
          user={editingUser}
          onSave={handleSaveUser}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

// 编辑用户模态框组件
const EditUserModal: React.FC<{
  user: User;
  onSave: (updatedUser: Partial<User>) => void;
  onClose: () => void;
}> = ({ user, onSave, onClose }) => {
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState<User['role']>(user.role);
  const [avatar, setAvatar] = useState(user.avatar || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      role,
      avatar: avatar || undefined
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-white/10 rounded-sm p-6 w-full max-w-md">
        <h3 className="text-lg font-medium text-slate-100 mb-4">编辑用户</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-400 mb-2">
              姓名
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-800 border border-white/10 rounded-sm px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-400 mb-2">
              角色
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as User['role'])}
              className="w-full bg-slate-800 border border-white/10 rounded-sm px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="author">作者</option>
              <option value="editor">编辑者</option>
              <option value="admin">管理员</option>
            </select>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-400 mb-2">
              头像URL
            </label>
            <input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full bg-slate-800 border border-white/10 rounded-sm px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="https://example.com/avatar.jpg"
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-emerald-700 hover:bg-emerald-600 text-white rounded-sm"
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserManager;