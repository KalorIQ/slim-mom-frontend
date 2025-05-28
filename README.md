# 🍎 Slim Mom - Calorie Tracking & Diet Application

**Slim Mom** is a modern web application that helps users develop healthy eating habits by calculating their daily calorie needs. It offers personalized calorie calculation, food diary tracking, and progress monitoring features.

## 🌐 Live Demo
<!-- Demo link will be added here -->

## 🚀 Features

### 🔐 User Management
- **Secure Registration/Login System**: JWT-based authentication
- **Password Visibility Control**: Secure password input
- **Automatic Session Management**: Persistent sessions with Redux Persist
- **Token Refresh**: Automatic access token renewal

### 📊 Calorie Calculator
- **Personalized Calculation**: Based on height, weight, age, and blood type
- **Scientific Formula**: Based on Mifflin-St Jeor equation
- **Target Weight Support**: Calorie adjustment according to desired weight
- **Blood Type-Based Recommendations**: Nutrition advice based on blood type

### 📝 Food Diary
- **Product Search**: Search in extensive nutrition database
- **Calorie Tracking**: Automatic calorie calculation
- **Daily Summary**: View consumed/remaining calories
- **Date-Based Records**: Access past records with calendar
- **Product Management**: Easy add/remove operations

### 👤 Profile Management
- **Detailed Statistics**: BMI, weight loss, daily streak
- **Progress Charts**: Visual tracking with Chart.js
- **Achievement Badges**: Motivational rewards
- **Weekly Analysis**: Calorie consumption trends

### 🌍 Multi-Language Support
- **3 Languages**: Turkish, English, Russian
- **Auto Detection**: Automatic browser language detection
- **Dynamic Translation**: All UI elements are translatable

### 🎨 Modern Interface
- **Responsive Design**: Compatible with mobile, tablet, and desktop
- **Dark/Light Theme**: Theme switching based on user preference
- **Animations**: Smooth transitions with Framer Motion
- **Modern UI/UX**: User-friendly interface design

## 🛠️ Technology Stack

### Frontend Framework
- **React 19.1.0**: Modern React hooks and functional components
- **Vite 6.3.5**: Fast development and build tool
- **React Router 7.6.1**: SPA routing management

### State Management
- **Redux Toolkit 2.8.2**: Modern Redux state management
- **Redux Persist 6.0.0**: Persistent state storage
- **React Redux 9.2.0**: React-Redux integration

### Form Management
- **Formik 2.4.6**: Form state and validation management
- **Yup 1.6.1**: Schema-based validation

### HTTP Client
- **Axios 1.9.0**: API requests and interceptors

### Multi-Language Support
- **i18next 25.2.1**: Internationalization framework
- **react-i18next 15.5.2**: React integration
- **i18next-browser-languagedetector 8.1.0**: Automatic language detection

### UI/UX Libraries
- **React Icons 5.5.0**: Rich icon collection
- **React Calendar 5.1.0**: Date picker component
- **React Toastify 11.0.5**: Notification system
- **React Awesome Spinners 1.3.1**: Loading animations

### Animation and Graphics
- **Framer Motion 12.11.4**: Advanced animation library
- **GSAP 3.13.0**: High-performance animations
- **Chart.js 4.4.9**: Chart and graph creation
- **React ChartJS 2 5.3.0**: React Chart.js integration

### Development Tools
- **ESLint 9.25.0**: Code quality and standards
- **TypeScript Types**: React and React DOM type definitions

### Deployment
- **Vercel**: Automatic deployment and hosting
- **SPA Routing**: Single Page Application support

## 📁 Project Structure

```
slim-mom-frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── CalculatorForm/  # Calorie calculator form
│   │   ├── Navigation/      # Main navigation menu
│   │   ├── Summary/         # Daily calorie summary
│   │   ├── Header/          # Page header
│   │   ├── Footer/          # Page footer
│   │   └── ...
│   ├── pages/               # Page components
│   │   ├── HomePage/        # Home page
│   │   ├── LoginPage/       # Login page
│   │   ├── RegisterPage/    # Registration page
│   │   ├── DiaryPage/       # Food diary
│   │   ├── CalculatorPage/  # Calorie calculator
│   │   └── ProfilePage/     # User profile
│   ├── redux/               # State management
│   │   ├── auth/            # Authentication
│   │   ├── products/        # Product and diary management
│   │   └── store.js         # Redux store configuration
│   ├── router/              # Routing configuration
│   ├── i18n/                # Multi-language support
│   │   ├── locales/         # Language files (tr, en, ru)
│   │   └── i18n.js          # i18n configuration
│   ├── utils/               # Utility functions
│   ├── styles/              # Global CSS files
│   ├── assets/              # Static files (images, icons)
│   └── Validator/           # Form validation schemas
├── public/                  # Static files
├── package.json             # Project dependencies
├── vite.config.js          # Vite configuration
├── vercel.json             # Vercel deployment settings
└── README.md               # Project documentation
```

## 🔧 Installation and Setup

### Requirements
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Clone the project:**
```bash
git clone https://github.com/your-username/slim-mom-frontend.git
cd slim-mom-frontend
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
```

3. **Start development server:**
```bash
npm run dev
# or
yarn dev
```

4. **Open in browser:**
```
http://localhost:5173
```

### Build and Deployment

```bash
# Create production build
npm run build

# Build preview
npm run preview

# Code quality check
npm run lint
```

## 🏗️ Architecture and Design Patterns

### Component Architecture
- **Functional Components**: Modern React hooks usage
- **Custom Hooks**: Reusable logic
- **Compound Components**: Complex UI components
- **Higher-Order Components**: Shared functionality

### State Management Pattern
- **Redux Toolkit**: Modern Redux best practices
- **Slice Pattern**: Feature-based state organization
- **Async Thunks**: For API calls
- **Selectors**: Memoized state selectors

### Routing Strategy
- **Protected Routes**: Pages requiring authentication
- **Public Routes**: Publicly accessible pages
- **Lazy Loading**: Performance optimization

### API Integration
- **Axios Interceptors**: Automatic token management
- **Error Handling**: Centralized error management
- **Request/Response Transformation**: Data transformations

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Unauthorized access protection
- **Input Validation**: XSS and injection attack protection
- **HTTPS**: Secure data transmission
- **Token Refresh**: Automatic session renewal

## 📱 Responsive Design

- **Mobile First**: Mobile-first design approach
- **Breakpoints**: 768px, 1024px, 1200px
- **Flexible Layouts**: CSS Grid and Flexbox
- **Touch Friendly**: Mobile touch optimization

## 🌐 Multi-Language Support

### Supported Languages
- 🇹🇷 **Turkish** (tr)
- 🇺🇸 **English** (en)
- 🇷🇺 **Russian** (ru)

### Features
- Automatic language detection
- Language preference storage in LocalStorage
- Dynamic language switching
- Date and number formats

## 📊 Performance Optimizations

- **Code Splitting**: Route-based code splitting
- **Lazy Loading**: Load on demand
- **Memoization**: React.memo and useMemo
- **Bundle Optimization**: Optimized build with Vite
- **Image Optimization**: WebP format support

## 🧪 Testing Strategy

- **Unit Tests**: Component and utility tests
- **Integration Tests**: API integration tests
- **E2E Tests**: User scenarios
- **Performance Tests**: Loading speed tests

## 🚀 Deployment

### Vercel Deployment
- Automatic Git integration
- Preview deployments
- Environment variables
- Custom domain support

### Environment Variables
```env
VITE_API_BASE_URL=your_api_url
VITE_APP_NAME=Slim Mom
```

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 👥 Development Team

- **Frontend Developer**: Modern React and Redux specialist
- **UI/UX Designer**: User experience focused design
- **Backend Integration**: RESTful API integration

## 📞 Contact

- **Website**: [Slim Mom](#)
- **Email**: support@slimmom.com
- **GitHub**: [Project Repository](https://github.com/your-username/slim-mom-frontend)

## 🔄 Updates

### v1.0.0 (2024)
- ✅ Basic calorie calculator
- ✅ User authentication
- ✅ Food diary
- ✅ Multi-language support
- ✅ Responsive design

### Future Features
- 🔄 Social media integration
- 🔄 Nutrition expert consultation
- 🔄 Mobile application
- 🔄 Wearable device integration
- 🔄 AI-powered nutrition recommendations

---

**Start your healthy lifestyle journey with Slim Mom!** 🌟

## 🔧 Backend Konfigürasyonu

### Backend API Bilgileri
- **Base URL:** `http://localhost:3000`
- **API Prefix:** `/api`
- **Dokümantasyon:** `http://localhost:3000/api-docs`
- **Database:** MongoDB Atlas
- **Port:** 3000

### Backend Bağlantısı
Frontend, yerel backend sunucusuna bağlanacak şekilde konfigüre edilmiştir:

```javascript
// Axios Instance Configuration
baseURL: "http://localhost:3000"
```

### API Test Etme
Backend bağlantısını test etmek için:

```javascript
// Browser console'da çalıştırın
import apiTest from './src/utils/apiTest.js';
apiTest.runAllTests();
```

### Mevcut API Endpointleri

#### Kimlik Doğrulama
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/login` - Kullanıcı girişi
- `POST /api/auth/logout` - Çıkış yapma
- `POST /api/auth/refresh` - Token yenileme
- `POST /api/auth/forgot-password` - Şifre sıfırlama
- `POST /api/auth/send-mail` - Mail gönderme

#### Ürün Yönetimi
- `GET /api/products/allProducts` - Tüm ürünleri getir
- `GET /api/products/searchProducts` - Ürün arama
- `POST /api/user/products` - Ürün ekleme
- `GET /api/user/products` - Kullanıcı ürünleri
- `DELETE /api/user/products/:id` - Ürün silme

#### Kullanıcı İstatistikleri
- `GET /api/user/my-daily-calories` - Günlük kalori
- `GET /api/user/my-daily-calory-needs` - Kalori ihtiyacı
- `POST /api/user/daily-calory-needs` - Kalori hesaplama
- `GET /api/user/weekly-calories` - Haftalık kalori
- `GET /api/user/weight-progress` - Kilo takibi
- `GET /api/user/stats` - Genel istatistikler
- `PATCH /api/user/infouser-update` - Kullanıcı güncelleme

## 🎯 Kullanım

### 1. Hesap Oluşturma
- Ana sayfada "Kayıt Ol" butonuna tıklayın
- Gerekli bilgileri doldurun
- Email doğrulaması yapın

### 2. Profil Kurulumu
- Boy, kilo, yaş bilgilerini girin
- Hedef kiloyu belirleyin
- Aktivite seviyesini seçin

### 3. Günlük Takip
- Tükettiğiniz besinleri ekleyin
- Kalori alımınızı kontrol edin
- İlerlemenizi takip edin

### 4. Raporlar
- Haftalık/aylık raporları inceleyin
- Grafikleri analiz edin
- Hedeflerinizi güncelleyin

## 🔧 Geliştirme

### Proje Yapısı
```
src/
├── components/          # React bileşenleri
├── pages/              # Sayfa bileşenleri
├── redux/              # State yönetimi
│   ├── auth/           # Kimlik doğrulama
│   └── products/       # Ürün yönetimi
├── utils/              # Yardımcı fonksiyonlar
│   ├── axiosInstance.js # API konfigürasyonu
│   └── apiTest.js      # API test araçları
├── assets/             # Statik dosyalar
└── locales/            # Çeviri dosyaları
```

### API Konfigürasyonu
```javascript
// src/utils/axiosInstance.js
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});
```

### Yeni Endpoint Ekleme
```javascript
// src/redux/products/productOperation.js
const newEndpoint = createAsyncThunk(
  "api/endpoint-name",
  async (data, thunkAPI) => {
    // Implementation
  }
);
```

## 🧪 Test Etme

### API Testleri
```javascript
// Browser console'da
import apiTest from './src/utils/apiTest.js';

// Tüm testleri çalıştır
apiTest.runAllTests();

// Tek test çalıştır
apiTest.testBackendConnection();
apiTest.testProductSearch("apple");
```

### Manuel Test
```bash
# Backend bağlantısı
curl http://localhost:3000/

# Ürün arama
curl "http://localhost:3000/api/products/searchProducts?title=apple"

# Kullanıcı kaydı
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456","name":"Test"}'
```

## 📊 Kod İstatistikleri

- **Toplam Satır:** 15,854
- **Dosya Sayısı:** 107
- **CSS:** 64.3% (10,193 satır)
- **JavaScript/JSX:** 32.6% (5,164 satır)
- **JSON:** 3.1% (497 satır)

## 🚀 Deployment

### Vercel Deployment
```bash
# Vercel CLI ile deploy
npm i -g vercel
vercel --prod
```

### Environment Variables
```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=KalorIQ
```

## 🤝 Katkıda Bulunma

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👥 Geliştirme Ekibi

- **Frontend Developer**: Modern React ve Redux uzmanı
- **Backend Integration**: RESTful API entegrasyonu
- **UI/UX Designer**: Kullanıcı deneyimi odaklı tasarım

## 📞 İletişim

- **Website**: [KalorIQ](#)
- **Email**: support@kaloriq.com
- **GitHub**: [KalorIQ/slim-mom-frontend](https://github.com/KalorIQ/slim-mom-frontend)

## 🔄 Güncellemeler

### v1.0.0 (2025)
- ✅ Backend API entegrasyonu
- ✅ JWT kimlik doğrulama
- ✅ Kalori hesaplama sistemi
- ✅ Besin takip sistemi
- ✅ Çok dil desteği
- ✅ Responsive tasarım
- ✅ API test araçları

### Gelecek Özellikler
- 🔄 Sosyal medya entegrasyonu
- 🔄 Beslenme uzmanı danışmanlığı
- 🔄 Mobil uygulama
- 🔄 Giyilebilir cihaz entegrasyonu
- 🔄 AI destekli beslenme önerileri

---

**KalorIQ ile sağlıklı yaşam yolculuğunuza başlayın!** 🌟 