// MongoDB initialization script
db = db.getSiblingDB('algomath_kids');

// Kullanıcı oluştur
db.createUser({
  user: 'algomath_user',
  pwd: 'algomath_password',
  roles: [
    {
      role: 'readWrite',
      db: 'algomath_kids'
    }
  ]
});

// Temel koleksiyonları oluştur
db.createCollection('users');
db.createCollection('courses');
db.createCollection('assignments');
db.createCollection('quizzes');
db.createCollection('documents');
db.createCollection('profiles');
db.createCollection('chats');

print('MongoDB initialization completed successfully!');
