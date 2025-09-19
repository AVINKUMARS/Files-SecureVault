import React, { useState, useRef } from 'react';
import {
  Lock,
  Shield,
  Upload,
  Download,
  User,
  LogOut,
  Home,
  FileText,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Menu,
  X,
  Star,
  Zap,
  Crown,
  ArrowRight,
} from 'lucide-react';

const API_BASE = 'http://localhost:8000';

// Notification Component
const Notification = ({ notification, onClose }) => {
  if (!notification) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top duration-300">
      <div
        className={`flex items-center space-x-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-2xl backdrop-blur-lg border ${
          notification.type === 'success'
            ? 'bg-green-500/20 border-green-500/30 text-green-300'
            : 'bg-red-500/20 border-red-500/30 text-red-300'
        }`}
      >
        {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
        <span className="font-medium text-sm sm:text-base">{notification.message}</span>
      </div>
    </div>
  );
};

// Login Page Component
const LoginPage = ({ onLogin, onSwitchToRegister, loading, error }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username.trim() && formData.password.trim()) {
      onLogin(formData.username, formData.password);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative w-full max-w-md">
        <div className="relative backdrop-blur-xl bg-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">SecureVault</h1>
            <p className="text-gray-300 text-sm sm:text-base">Premium file encryption service</p>
            <div className="flex items-center justify-center mt-2 text-yellow-400">
              <Crown className="w-4 h-4 mr-1" />
              <span className="text-xs font-medium">PREMIUM</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  placeholder="Username"
                  className="w-full px-4 py-4 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                  required
                />
              </div>
              
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-4 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                <p className="text-red-300 text-sm text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-8 pt-6 border-t border-white/10">
            <p className="text-gray-300 text-sm">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToRegister}
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                Create one
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Register Page Component
const RegisterPage = ({ onRegister, onSwitchToLogin, loading, error }) => {
  const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return;
    }
    if (formData.username.trim() && formData.password.trim()) {
      onRegister(formData.username, formData.password);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative w-full max-w-md">
        <div className="relative backdrop-blur-xl bg-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Join SecureVault</h1>
            <p className="text-gray-300 text-sm sm:text-base">Create your premium account</p>
            <div className="flex items-center justify-center mt-2 text-yellow-400">
              <Star className="w-4 h-4 mr-1" />
              <span className="text-xs font-medium">FREE PREMIUM ACCESS</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  placeholder="Choose username"
                  className="w-full px-4 py-4 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
                  required
                />
              </div>
              
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Create password"
                  className="w-full px-4 py-4 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Confirm password"
                  className="w-full px-4 py-4 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl">
                <p className="text-red-300 text-sm text-center">Passwords don't match</p>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                <p className="text-red-300 text-sm text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || formData.password !== formData.confirmPassword}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Create Account
                  <Zap className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-8 pt-6 border-t border-white/10">
            <p className="text-gray-300 text-sm">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-green-400 hover:text-green-300 font-medium transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mobile Sidebar Component
const MobileSidebar = ({ isOpen, onClose, user, currentView, setCurrentView, handleLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="absolute left-0 top-0 h-full w-80 bg-slate-900/95 backdrop-blur-xl border-r border-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Menu</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex items-center space-x-3 mb-8 pb-6 border-b border-white/10">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">{user}</h3>
            <p className="text-gray-400 text-sm flex items-center">
              <Crown className="w-3 h-3 mr-1" />
              Premium User
            </p>
          </div>
        </div>

        <nav className="space-y-2">
          {[
            { id: 'home', label: 'Home', icon: Home },
            { id: 'encrypt', label: 'Encrypt File', icon: Lock },
            { id: 'decrypt', label: 'Decrypt File', icon: Shield },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentView(item.id);
                onClose();
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                currentView === item.id
                  ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white border border-purple-500/30'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button
          onClick={() => {
            handleLogout();
            onClose();
          }}
          className="mt-8 w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-red-500/20 rounded-xl font-medium transition-all duration-300"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

// Desktop Sidebar Component
const Sidebar = ({ user, currentView, setCurrentView, handleLogout }) => (
  <div className="hidden md:flex w-72 bg-black/20 backdrop-blur-lg border-r border-white/10 p-6 flex-shrink-0 flex-col">
    <div className="flex items-center space-x-3 mb-8 pb-6 border-b border-white/10">
      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
        <User className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-white font-semibold truncate">{user}</h2>
        <p className="text-gray-400 text-sm flex items-center">
          <Crown className="w-3 h-3 mr-1" />
          Premium User
        </p>
      </div>
    </div>

    <nav className="space-y-2 flex-1">
      {[
        { id: 'home', label: 'Home', icon: Home },
        { id: 'encrypt', label: 'Encrypt File', icon: Lock },
        { id: 'decrypt', label: 'Decrypt File', icon: Shield },
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => setCurrentView(item.id)}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
            currentView === item.id
              ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white border border-purple-500/30'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <item.icon className="w-5 h-5" />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>

    <button
      onClick={handleLogout}
      className="mt-6 w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-red-500/20 rounded-xl font-medium transition-all duration-300"
    >
      <LogOut className="w-5 h-5" />
      <span>Logout</span>
    </button>
  </div>
);

// Main App Component
const SecureVault = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(null);
  const [userFiles, setUserFiles] = useState([]);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // File upload states
  const [uploadedFile, setUploadedFile] = useState(null);
  const [encryptedFile, setEncryptedFile] = useState(null);
  const [enteredUsername, setEnteredUsername] = useState('');
  
  const fileInputRef = useRef(null);
  const encryptedFileInputRef = useRef(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Real API functions
  const handleLogin = async (username, password) => {
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.username);
        setCurrentPage('dashboard');
        setCurrentView('home');
        fetchUserFiles(data.username);
        showNotification('Successfully logged in!');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Connection failed. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (username, password) => {
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      const response = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        showNotification('Account created successfully!');
        setCurrentPage('login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Connection failed. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
    setCurrentView('home');
    setUserFiles([]);
    setUploadedFile(null);
    setEncryptedFile(null);
    setEnteredUsername('');
    showNotification('Successfully logged out!');
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'encrypt') setUploadedFile(file);
      else setEncryptedFile(file);
    }
  };

  const fetchUserFiles = async (username) => {
    try {
      const response = await fetch(`${API_BASE}/files/${username}`);
      const data = await response.json();
      setUserFiles(data.files || []);
    } catch (error) {
      console.error('Fetch files error:', error);
      showNotification('Failed to fetch files', 'error');
    }
  };

  const handleEncrypt = async () => {
    if (!uploadedFile || !user) return;
    
    const formData = new FormData();
    formData.append('username', user);
    formData.append('file', uploadedFile);

    try {
      const response = await fetch(`${API_BASE}/encrypt`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', uploadedFile.name + '.enc');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        showNotification('File encrypted successfully!');
        setUploadedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        fetchUserFiles(user);
      } else {
        throw new Error('Encryption failed');
      }
    } catch (error) {
      console.error('Encryption error:', error);
      showNotification('Encryption failed! Please check server connection.', 'error');
    }
  };

  const handleDecrypt = async () => {
    if (!encryptedFile || !enteredUsername.trim()) return;
    
    const formData = new FormData();
    formData.append('username', enteredUsername);
    formData.append('file', encryptedFile);

    try {
      const response = await fetch(`${API_BASE}/decrypt`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', encryptedFile.name.replace('.enc', ''));
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        showNotification('File decrypted successfully!');
        setEncryptedFile(null);
        setEnteredUsername('');
        if (encryptedFileInputRef.current) encryptedFileInputRef.current.value = '';
        fetchUserFiles(enteredUsername);
      } else {
        throw new Error('Decryption failed');
      }
    } catch (error) {
      console.error('Decryption error:', error);
      showNotification('Decryption failed! Please check server connection.', 'error');
    }
  };

  // Main Content Component
  const MainContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                  Welcome back, {user}!
                </h1>
                <p className="text-gray-400">Manage your encrypted files securely</p>
              </div>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 text-gray-400 hover:text-white"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm font-medium">Total Files</p>
                    <p className="text-3xl font-bold text-white">{userFiles.length}</p>
                  </div>
                  <FileText className="w-8 h-8 text-purple-400" />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-lg rounded-2xl p-6 border border-green-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-300 text-sm font-medium">Encrypted</p>
                    <p className="text-3xl font-bold text-white">{userFiles.filter(f => f.type === 'encrypted').length}</p>
                  </div>
                  <Lock className="w-8 h-8 text-green-400" />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-300 text-sm font-medium">Decrypted</p>
                    <p className="text-3xl font-bold text-white">{userFiles.filter(f => f.type === 'decrypted').length}</p>
                  </div>
                  <Shield className="w-8 h-8 text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-2" />
                Your Files
              </h2>
              {userFiles.length > 0 ? (
                <div className="grid gap-3">
                  {userFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <span className="text-white font-medium">{file.name}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            file.type === 'encrypted'
                              ? 'bg-purple-500/20 text-purple-300'
                              : 'bg-green-500/20 text-green-300'
                          }`}
                        >
                          {file.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg mb-2">No files found</p>
                  <p className="text-gray-500">Start encrypting your files to see them here</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'encrypt':
        return (
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 flex items-center">
                  <Lock className="w-8 h-8 mr-3" />
                  Encrypt a File
                </h1>
                <p className="text-gray-400">Secure your files with military-grade encryption</p>
              </div>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 text-gray-400 hover:text-white"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/10">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-white/30 rounded-xl p-8 sm:p-12 text-center cursor-pointer hover:border-purple-500 transition-all duration-300 group"
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4 group-hover:text-purple-400 transition-colors" />
                  <p className="text-white font-medium mb-2">Click to upload or drag and drop</p>
                  <p className="text-gray-400 text-sm">Maximum file size: 50MB</p>
                  <p className="text-gray-500 text-xs mt-2">Supported: PDF, DOCX, PPTX, JPG, PNG, TXT</p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx,.pptx,.jpg,.png,.txt"
                  onChange={(e) => handleFileUpload(e, 'encrypt')}
                />

                {uploadedFile && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-green-300 font-medium">File ready for encryption</p>
                        <p className="text-green-400 text-sm truncate">{uploadedFile.name}</p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleEncrypt}
                  disabled={!uploadedFile}
                  className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Lock className="w-5 h-5 mr-2" />
                  Encrypt & Download
                </button>
              </div>
            </div>
          </div>
        );

      case 'decrypt':
        return (
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 flex items-center">
                  <Shield className="w-8 h-8 mr-3" />
                  Decrypt a File
                </h1>
                <p className="text-gray-400">Restore your encrypted files to original format</p>
              </div>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 text-gray-400 hover:text-white"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/10">
                <div
                  onClick={() => encryptedFileInputRef.current?.click()}
                  className="border-2 border-dashed border-white/30 rounded-xl p-8 sm:p-12 text-center cursor-pointer hover:border-green-500 transition-all duration-300 group"
                >
                  <Download className="w-12 h-12 text-gray-400 mx-auto mb-4 group-hover:text-green-400 transition-colors" />
                  <p className="text-white font-medium mb-2">Click to upload encrypted file</p>
                  <p className="text-gray-400 text-sm">Files with .enc extension only</p>
                  <p className="text-gray-500 text-xs mt-2">Encrypted files from SecureVault</p>
                </div>

                <input
                  ref={encryptedFileInputRef}
                  type="file"
                  className="hidden"
                  accept=".enc"
                  onChange={(e) => handleFileUpload(e, 'decrypt')}
                />

                {encryptedFile && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-green-300 font-medium">Encrypted file uploaded</p>
                        <p className="text-green-400 text-sm truncate">{encryptedFile.name}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <label className="block text-white font-medium mb-2">Enter Username</label>
                  <input
                    type="text"
                    value={enteredUsername}
                    onChange={(e) => setEnteredUsername(e.target.value)}
                    placeholder="Username who encrypted the file"
                    className="w-full px-4 py-4 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
                  />
                </div>

                <button
                  onClick={handleDecrypt}
                  disabled={!encryptedFile || !enteredUsername.trim()}
                  className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Decrypt & Download
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Dashboard Component
  const Dashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <Sidebar 
        user={user} 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        handleLogout={handleLogout} 
      />
      
      <div className="flex-1 relative">
        <MainContent />
      </div>

      <MobileSidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        user={user}
        currentView={currentView}
        setCurrentView={setCurrentView}
        handleLogout={handleLogout}
      />

      <Notification notification={notification} />
    </div>
  );

  // Main render
  if (currentPage === 'login') {
    return (
      <LoginPage
        onLogin={handleLogin}
        onSwitchToRegister={() => {
          setCurrentPage('register');
          setError('');
        }}
        loading={loading}
        error={error}
      />
    );
  }

  if (currentPage === 'register') {
    return (
      <RegisterPage
        onRegister={handleRegister}
        onSwitchToLogin={() => {
          setCurrentPage('login');
          setError('');
        }}
        loading={loading}
        error={error}
      />
    );
  }

  return (
    <div>
      <Dashboard />
      <Notification notification={notification} />
    </div>
  );
};

export default SecureVault;