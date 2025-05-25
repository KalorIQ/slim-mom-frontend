# 🍎 Slim Mom - Kalori Takip ve Diyet Uygulaması

**Slim Mom**, kullanıcıların günlük kalori ihtiyaçlarını hesaplayarak sağlıklı beslenme alışkanlıkları geliştirmelerine yardımcı olan modern bir web uygulamasıdır. Kişiselleştirilmiş kalori hesaplaması, yemek günlüğü tutma ve ilerleme takibi özellikleri sunar.

## 🌐 Canlı Demo
<!-- Demo linki buraya eklenecek -->

## 🚀 Özellikler

### 🔐 Kullanıcı Yönetimi
- **Güvenli Kayıt/Giriş Sistemi**: JWT tabanlı kimlik doğrulama
- **Şifre Görünürlük Kontrolü**: Güvenli şifre girişi
- **Otomatik Oturum Yönetimi**: Redux Persist ile kalıcı oturum
- **Token Yenileme**: Otomatik access token yenileme

### 📊 Kalori Hesaplayıcı
- **Kişiselleştirilmiş Hesaplama**: Boy, kilo, yaş ve kan grubuna göre
- **Bilimsel Formül**: Mifflin-St Jeor denklemi tabanlı
- **Hedef Kilo Desteği**: İstenilen kiloya göre kalori ayarlaması
- **Kan Grubu Bazlı Öneriler**: Kan grubuna göre beslenme tavsiyeleri

### 📝 Yemek Günlüğü
- **Ürün Arama**: Geniş besin veritabanında arama
- **Kalori Takibi**: Otomatik kalori hesaplaması
- **Günlük Özet**: Tüketilen/kalan kalori görüntüleme
- **Tarih Bazlı Kayıt**: Takvim ile geçmiş kayıtlara erişim
- **Ürün Yönetimi**: Kolay ekleme/çıkarma işlemleri

### 👤 Profil Yönetimi
- **Detaylı İstatistikler**: BMI, kilo kaybı, günlük seri
- **İlerleme Grafikleri**: Chart.js ile görsel takip
- **Başarı Rozetleri**: Motivasyon artırıcı ödüller
- **Haftalık Analiz**: Kalori tüketim trendleri

### 🌍 Çoklu Dil Desteği
- **3 Dil**: Türkçe, İngilizce, Rusça
- **Otomatik Algılama**: Tarayıcı dili otomatik tespiti
- **Dinamik Çeviri**: Tüm arayüz elementleri çevrilebilir

### 🎨 Modern Arayüz
- **Responsive Tasarım**: Mobil, tablet ve masaüstü uyumlu
- **Karanlık/Açık Tema**: Kullanıcı tercihi ile tema değişimi
- **Animasyonlar**: Framer Motion ile akıcı geçişler
- **Modern UI/UX**: Kullanıcı dostu arayüz tasarımı

## 🛠️ Teknoloji Stack'i

### Frontend Framework
- **React 19.1.0**: Modern React hooks ve functional components
- **Vite 6.3.5**: Hızlı geliştirme ve build aracı
- **React Router 7.6.1**: SPA routing yönetimi

### State Management
- **Redux Toolkit 2.8.2**: Modern Redux state yönetimi
- **Redux Persist 6.0.0**: Kalıcı state saklama
- **React Redux 9.2.0**: React-Redux entegrasyonu

### Form Yönetimi
- **Formik 2.4.6**: Form state ve validasyon yönetimi
- **Yup 1.6.1**: Schema tabanlı validasyon

### HTTP İstemcisi
- **Axios 1.9.0**: API istekleri ve interceptor'lar

### Çoklu Dil Desteği
- **i18next 25.2.1**: Uluslararasılaştırma framework'ü
- **react-i18next 15.5.2**: React entegrasyonu
- **i18next-browser-languagedetector 8.1.0**: Otomatik dil algılama

### UI/UX Kütüphaneleri
- **React Icons 5.5.0**: Zengin ikon koleksiyonu
- **React Calendar 5.1.0**: Tarih seçici komponenti
- **React Toastify 11.0.5**: Bildirim sistemi
- **React Awesome Spinners 1.3.1**: Loading animasyonları

### Animasyon ve Grafik
- **Framer Motion 12.11.4**: Gelişmiş animasyon kütüphanesi
- **GSAP 3.13.0**: Yüksek performanslı animasyonlar
- **Chart.js 4.4.9**: Grafik ve chart oluşturma
- **React ChartJS 2 5.3.0**: React Chart.js entegrasyonu

### Geliştirme Araçları
- **ESLint 9.25.0**: Kod kalitesi ve standartları
- **TypeScript Types**: React ve React DOM tip tanımları

### Deployment
- **Vercel**: Otomatik deployment ve hosting
- **SPA Routing**: Single Page Application desteği

## 📁 Proje Yapısı

```
slim-mom-frontend/
├── src/
│   ├── components/          # Yeniden kullanılabilir UI bileşenleri
│   │   ├── CalculatorForm/  # Kalori hesaplayıcı formu
│   │   ├── Navigation/      # Ana navigasyon menüsü
│   │   ├── Summary/         # Günlük kalori özeti
│   │   ├── Header/          # Sayfa başlığı
│   │   ├── Footer/          # Sayfa alt bilgisi
│   │   └── ...
│   ├── pages/               # Sayfa bileşenleri
│   │   ├── HomePage/        # Ana sayfa
│   │   ├── LoginPage/       # Giriş sayfası
│   │   ├── RegisterPage/    # Kayıt sayfası
│   │   ├── DiaryPage/       # Yemek günlüğü
│   │   ├── CalculatorPage/  # Kalori hesaplayıcı
│   │   └── ProfilePage/     # Kullanıcı profili
│   ├── redux/               # State yönetimi
│   │   ├── auth/            # Kimlik doğrulama
│   │   ├── products/        # Ürün ve günlük yönetimi
│   │   └── store.js         # Redux store yapılandırması
│   ├── router/              # Routing yapılandırması
│   ├── i18n/                # Çoklu dil desteği
│   │   ├── locales/         # Dil dosyaları (tr, en, ru)
│   │   └── i18n.js          # i18n yapılandırması
│   ├── utils/               # Yardımcı fonksiyonlar
│   ├── styles/              # Global CSS dosyaları
│   ├── assets/              # Statik dosyalar (resimler, ikonlar)
│   └── Validator/           # Form validasyon şemaları
├── public/                  # Statik dosyalar
├── package.json             # Proje bağımlılıkları
├── vite.config.js          # Vite yapılandırması
├── vercel.json             # Vercel deployment ayarları
└── README.md               # Proje dokümantasyonu
```

## 🔧 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js (v16 veya üzeri)
- npm veya yarn

### Kurulum Adımları

1. **Projeyi klonlayın:**
```bash
git clone https://github.com/your-username/slim-mom-frontend.git
cd slim-mom-frontend
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
# veya
yarn install
```

3. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
# veya
yarn dev
```

4. **Tarayıcıda açın:**
```
http://localhost:5173
```

### Build ve Deployment

```bash
# Production build oluşturma
npm run build

# Build önizlemesi
npm run preview

# Kod kalitesi kontrolü
npm run lint
```

## 🏗️ Mimari ve Tasarım Desenleri

### Component Architecture
- **Functional Components**: Modern React hooks kullanımı
- **Custom Hooks**: Yeniden kullanılabilir logic
- **Compound Components**: Karmaşık UI bileşenleri
- **Higher-Order Components**: Ortak işlevsellik paylaşımı

### State Management Pattern
- **Redux Toolkit**: Modern Redux best practices
- **Slice Pattern**: Feature-based state organization
- **Async Thunks**: API çağrıları için
- **Selectors**: Memoized state seçicileri

### Routing Strategy
- **Protected Routes**: Kimlik doğrulama gerektiren sayfalar
- **Public Routes**: Herkese açık sayfalar
- **Lazy Loading**: Performans optimizasyonu

### API Integration
- **Axios Interceptors**: Otomatik token yönetimi
- **Error Handling**: Merkezi hata yönetimi
- **Request/Response Transformation**: Veri dönüşümleri

## 🔐 Güvenlik Özellikleri

- **JWT Authentication**: Güvenli token tabanlı kimlik doğrulama
- **Protected Routes**: Yetkisiz erişim koruması
- **Input Validation**: XSS ve injection saldırı koruması
- **HTTPS**: Güvenli veri iletimi
- **Token Refresh**: Otomatik oturum yenileme

## 📱 Responsive Tasarım

- **Mobile First**: Mobil öncelikli tasarım yaklaşımı
- **Breakpoints**: 768px, 1024px, 1200px
- **Flexible Layouts**: CSS Grid ve Flexbox
- **Touch Friendly**: Mobil dokunmatik optimizasyonu

## 🌐 Çoklu Dil Desteği

### Desteklenen Diller
- 🇹🇷 **Türkçe** (tr)
- 🇺🇸 **İngilizce** (en)
- 🇷🇺 **Rusça** (ru)

### Özellikler
- Otomatik dil algılama
- LocalStorage'da dil tercihi saklama
- Dinamik dil değişimi
- Tarih ve sayı formatları

## 📊 Performans Optimizasyonları

- **Code Splitting**: Route bazlı kod bölme
- **Lazy Loading**: Gerektiğinde yükleme
- **Memoization**: React.memo ve useMemo
- **Bundle Optimization**: Vite ile optimize edilmiş build
- **Image Optimization**: WebP format desteği

## 🧪 Test Stratejisi

- **Unit Tests**: Component ve utility testleri
- **Integration Tests**: API entegrasyon testleri
- **E2E Tests**: Kullanıcı senaryoları
- **Performance Tests**: Yükleme hızı testleri

## 🚀 Deployment

### Vercel Deployment
- Otomatik Git entegrasyonu
- Preview deployments
- Environment variables
- Custom domain desteği

### Environment Variables
```env
VITE_API_BASE_URL=your_api_url
VITE_APP_NAME=Slim Mom
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👥 Geliştirici Ekibi

- **Frontend Developer**: Modern React ve Redux uzmanı
- **UI/UX Designer**: Kullanıcı deneyimi odaklı tasarım
- **Backend Integration**: RESTful API entegrasyonu

## 📞 İletişim

- **Website**: [Slim Mom](https://slmmom-git-main-atilla-goguslus-projects.vercel.app/)
- **Email**: support@slimmom.com
- **GitHub**: [Project Repository](https://github.com/your-username/slim-mom-frontend)

## 🔄 Güncellemeler

### v1.0.0 (2024)
- ✅ Temel kalori hesaplayıcı
- ✅ Kullanıcı kimlik doğrulama
- ✅ Yemek günlüğü
- ✅ Çoklu dil desteği
- ✅ Responsive tasarım

### Gelecek Özellikler
- 🔄 Sosyal medya entegrasyonu
- 🔄 Beslenme uzmanı danışmanlığı
- 🔄 Mobil uygulama
- 🔄 Wearable device entegrasyonu
- 🔄 AI destekli beslenme önerileri

---

**Slim Mom** ile sağlıklı yaşam yolculuğunuza başlayın! 🌟
