import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { 
  FaUser, 
  FaWeight, 
  FaTrophy, 
  FaFire, 
  FaCalendarAlt, 
  FaChartLine,
  FaMedal,
  FaBullseye,
  FaHeart,
  FaUserCircle,
  FaCrown,
  FaIdCard,
  FaRocket,
  FaSun,
  FaMoon,
  FaStar,
  FaLock,
  FaCalendarCheck,
  FaUtensils,
  FaBalanceScale,
  FaAward,
  FaGem,
  FaLightbulb,
  FaBolt,
  FaAppleAlt
} from 'react-icons/fa';
import { 
  HiSparkles 
} from 'react-icons/hi';
import { 
  IoSunny,
  IoMoon
} from 'react-icons/io5';

import styles from './ProfilePage.module.css';
import { selectUser } from '../../redux/auth/authSelectors';
import { 
  selectWeeklyCalories, 
  selectWeightProgress, 
  selectUserStats,
  selectDailyRate,
  selectActivityStats,
  selectWeightHistory,
  selectMacroBreakdown,
  selectUserAchievements,
  selectEnhancedUserStats,
  selectFormattedWeightHistory,
  selectFormattedMacroData,
  selectProductsLoading,
} from '../../redux/products/productSelectors';
import { 
  getWeeklyCalories, 
  getWeightProgress, 
  getUserActivityStats,
  getWeightHistory,
  getMacroBreakdown,
  getUserAchievements,
  getComprehensiveStats,
  getUserStats,
} from '../../redux/products/productOperation';
import Loader from '../../components/Loader/Loader.jsx';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ProfilePage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  
  // Safety checks for user and userInfo
  const userInfo = user?.infouser || {
    currentWeight: null,
    height: null,
    age: null,
    desireWeight: null,
    bloodType: null,
    dailyRate: null,
  };
  
  // Backend data selectors
  const weeklyCaloriesData = useSelector(selectWeeklyCalories);
  const weightProgressData = useSelector(selectWeightProgress);
  const userStats = useSelector(selectUserStats);
  const activityStats = useSelector(selectActivityStats);
  const enhancedUserStats = useSelector(selectEnhancedUserStats);
  const weightHistory = useSelector(selectWeightHistory);
  const formattedWeightHistory = useSelector(selectFormattedWeightHistory);
  const macroBreakdown = useSelector(selectMacroBreakdown);
  const formattedMacroData = useSelector(selectFormattedMacroData);
  const userAchievements = useSelector(selectUserAchievements);
  const dailyRate = useSelector(selectDailyRate);
  const isLoading = useSelector(selectProductsLoading);
  
  // Get backendUserStats from Redux state directly
  const backendUserStats = useSelector(state => state.products.backendUserStats);
  
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch all data when component mounts
  useEffect(() => {
    console.log('ProfilePage: Fetching data from backend endpoints...');
    
    // Primary data sources - new backend endpoints
    dispatch(getComprehensiveStats());
    dispatch(getUserStats());
    dispatch(getUserActivityStats());
    dispatch(getWeightHistory());
    dispatch(getWeightProgress());
    dispatch(getMacroBreakdown('7days'));
    dispatch(getUserAchievements());
    
    // Legacy endpoints for compatibility
    dispatch(getWeeklyCalories());
  }, [dispatch]);

  const [weeklyData, setWeeklyData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: t('profile.caloriesConsumed'),
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: '#FC842D',
        backgroundColor: 'rgba(252, 132, 45, 0.1)',
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: '#FC842D',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: t('profile.calorieGoal'),
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: '#9b9faa',
        backgroundColor: 'rgba(155, 159, 170, 0.1)',
        borderDash: [5, 5],
        borderWidth: 2,
        pointBackgroundColor: '#9b9faa',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
      }
    ],
  });

  const [weightProgress, setWeightProgress] = useState({
    labels: [],
    datasets: [
      {
        label: t('profile.weight'),
        data: [],
        backgroundColor: '#FC842D',
        borderColor: '#FC842D',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }
    ],
  });

  const [macroData, setMacroData] = useState({
    labels: [t('profile.carbs'), t('profile.protein'), t('profile.fat')],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: [
          '#FC842D',  // Orange for carbs
          '#2ecc71',  // Green for protein  
          '#e74c3c'   // Red for fat
        ],
        hoverBackgroundColor: [
          '#e87728',  // Darker orange
          '#27ae60',  // Darker green
          '#c0392b'   // Darker red
        ],
        borderWidth: 3,
        borderColor: '#ffffff',
        hoverBorderWidth: 4,
      }
    ],
  });

  // Update chart data when backend data arrives
  useEffect(() => {
    // Use weekly calories data from backend
    if (weeklyCaloriesData && weeklyCaloriesData.length > 0) {
      const caloriesData = weeklyCaloriesData.map(day => day.calories || 0);
      const goalData = new Array(7).fill(dailyRate || userInfo?.dailyRate || backendUserStats?.averageDailyCalories || 1850);
      
      setWeeklyData(prev => ({
        ...prev,
        datasets: [
          {
            ...prev.datasets[0],
            data: caloriesData,
            label: t('profile.caloriesConsumed'),
            borderColor: '#FC842D',
            backgroundColor: 'rgba(252, 132, 45, 0.1)',
            tension: 0.4,
            borderWidth: 3,
            pointBackgroundColor: '#FC842D',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8,
          },
          {
            ...prev.datasets[1],
            data: goalData,
            label: t('profile.calorieGoal'),
            borderColor: '#9b9faa',
            backgroundColor: 'rgba(155, 159, 170, 0.1)',
            borderDash: [5, 5],
            borderWidth: 2,
            pointBackgroundColor: '#9b9faa',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
          }
        ]
      }));
    }
  }, [weeklyCaloriesData, dailyRate, userInfo?.dailyRate, backendUserStats?.averageDailyCalories, t]);

  useEffect(() => {
    // Use formatted weight history from backend if available
    const weightSource = formattedWeightHistory.length > 0 ? formattedWeightHistory : weightProgressData;
    
    if (weightSource && weightSource.length > 0) {
      const weightData = weightSource.map(week => week.weight);
      const labels = weightSource.map((week, index) => week.week || `Week ${index + 1}`);
      
      setWeightProgress(prev => ({
        labels: labels,
        datasets: [
          {
            ...prev.datasets[0],
            data: weightData,
            label: t('profile.weight'),
            backgroundColor: '#FC842D',
            borderColor: '#FC842D',
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false,
          }
        ]
      }));
    }
  }, [weightProgressData, formattedWeightHistory, t]);

  useEffect(() => {
    // Use real backend macro breakdown data
    if (macroBreakdown && (macroBreakdown.carbs > 0 || macroBreakdown.protein > 0 || macroBreakdown.fat > 0)) {
      const totalMacros = macroBreakdown.carbs + macroBreakdown.protein + macroBreakdown.fat;
      
      if (totalMacros > 0) {
        // Calculate percentages for the pie chart
        const carbsPercentage = ((macroBreakdown.carbs / totalMacros) * 100).toFixed(1);
        const proteinPercentage = ((macroBreakdown.protein / totalMacros) * 100).toFixed(1);
        const fatPercentage = ((macroBreakdown.fat / totalMacros) * 100).toFixed(1);
        
        setMacroData({
          labels: [
            `${t('profile.carbs')} (${carbsPercentage}%)`,
            `${t('profile.protein')} (${proteinPercentage}%)`,
            `${t('profile.fat')} (${fatPercentage}%)`
          ],
          datasets: [
            {
              data: [macroBreakdown.carbs, macroBreakdown.protein, macroBreakdown.fat],
              backgroundColor: [
                '#FC842D',  // Orange for carbs
                '#2ecc71',  // Green for protein  
                '#e74c3c'   // Red for fat
              ],
              hoverBackgroundColor: [
                '#e87728',  // Darker orange
                '#27ae60',  // Darker green
                '#c0392b'   // Darker red
              ],
              borderWidth: 3,
              borderColor: '#ffffff',
              hoverBorderWidth: 4,
            }
          ]
        });
      }
    } else {
      // Show placeholder when no data available
      setMacroData({
        labels: [t('profile.noDataAvailable')],
        datasets: [
          {
            data: [1],
            backgroundColor: ['#e0e0e0'],
            hoverBackgroundColor: ['#d0d0d0'],
            borderWidth: 3,
            borderColor: '#ffffff',
          }
        ]
      });
    }
  }, [macroBreakdown, t]);

  // Calculate days active since registration
  const getDaysActive = () => {
    if (!user?.createdAt) return 0;
    
    const createdDate = new Date(user.createdAt);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - createdDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    
    return daysDifference;
  };

  // Define all possible achievements with unlock requirements
  const allPossibleAchievements = [
    {
      id: 'firstWeek',
      name: 'firstWeek', 
      icon: <FaStar />,
      requirement: t('profile.firstWeekDesc'),
      progress: getDaysActive() >= 7 ? 100 : Math.round((getDaysActive() / 7) * 100),
      earned: getDaysActive() >= 7,
      category: 'time'
    },
    {
      id: 'streakMaster',
      name: 'streakMaster', 
      icon: <FaFire />, 
      requirement: t('profile.streakMasterDesc'),
      progress: Math.min(100, Math.round(((backendUserStats?.streak || 0) / 7) * 100)),
      earned: (backendUserStats?.streak || 0) >= 7,
      category: 'consistency'
    },
    {
      id: 'goalReacher',
      name: 'goalReacher', 
      icon: <FaBullseye />, 
      requirement: t('profile.goalReacherDesc'),
      progress: Math.min(100, Math.round(((backendUserStats?.streak || 0) / 30) * 100)),
      earned: (backendUserStats?.streak || 0) >= 30,
      category: 'consistency'
    },
    {
      id: 'healthyEater',
      name: 'healthyEater', 
      icon: <FaAppleAlt />, 
      requirement: t('profile.healthyEaterDesc'),
      progress: Math.min(100, Math.round(((backendUserStats?.totalEntries || 0) / 50) * 100)),
      earned: (backendUserStats?.totalEntries || 0) >= 50,
      category: 'activity'
    },
    {
      id: 'weightLoss5kg',
      name: 'weightLoss5kg', 
      icon: <FaBalanceScale />, 
      requirement: t('profile.weightLoss5kgDesc'),
      progress: Math.min(100, Math.round(((backendUserStats?.weightLoss || 0) / 5) * 100)),
      earned: (backendUserStats?.weightLoss || 0) >= 5,
      category: 'weight'
    },
    {
      id: 'monthlyChamp',
      name: 'monthlyChamp', 
      icon: <FaCrown />, 
      requirement: t('profile.monthlyChampDesc'),
      progress: Math.min(100, Math.round(((backendUserStats?.daysActive || 0) / 30) * 100)),
      earned: (backendUserStats?.daysActive || 0) >= 30,
      category: 'time'
    }
  ];

  // Combine earned achievements from backend with progress on unearned ones
  const combinedAchievements = allPossibleAchievements.map(possibleAchievement => {
    // Güvenli array kontrolü
    const achievementsArray = Array.isArray(userAchievements) ? userAchievements : [];
    
    const earnedAchievement = achievementsArray.find(earned => 
      earned.title?.toLowerCase().includes(possibleAchievement.id.toLowerCase()) ||
      earned.id === possibleAchievement.id
    );
    
    if (earnedAchievement) {
      return {
        ...possibleAchievement,
        earned: true,
        unlockedAt: earnedAchievement.unlockedAt,
        description: earnedAchievement.description
      };
    }
    
    return possibleAchievement;
  });

  // Use backend achievements if available, otherwise show calculated ones
  const achievements = Array.isArray(userAchievements) && userAchievements.length > 0 
    ? combinedAchievements
    : allPossibleAchievements;

  const calculateBMI = () => {
    const height = userInfo?.height || 0;
    const weight = userInfo?.currentWeight || 0;
    
    if (height > 0 && weight > 0) {
      const heightInM = height / 100;
      const bmi = weight / (heightInM * heightInM);
      
      // BMI'nin mantıklı bir değer olup olmadığını kontrol et
      if (isNaN(bmi) || !isFinite(bmi)) {
        return (backendUserStats?.bmi || userStats?.bmi || 24.1).toFixed(1);
      }
      
      return bmi.toFixed(1);
    }
    
    return (backendUserStats?.bmi || userStats?.bmi || 24.1).toFixed(1);
  };

  const getBMICategory = (bmi) => {
    const numericBMI = parseFloat(bmi) || 24.1;
    
    if (numericBMI < 18.5) return { category: t('profile.underweight'), color: '#3498db' };
    if (numericBMI < 25) return { category: t('profile.normal'), color: '#2ecc71' };
    if (numericBMI < 30) return { category: t('profile.overweight'), color: '#f39c12' };
    return { category: t('profile.obese'), color: '#e74c3c' };
  };

  const calculateProgressPercentage = () => {
    // Güvenli değer kontrolü
    const currentWeight = userInfo?.currentWeight || 0;
    const desiredWeight = userInfo?.desireWeight || 0;
    const weightLoss = backendUserStats?.weightLoss || userStats?.weightLoss || 0;
    
    // Eğer gerekli değerler yoksa 0 döndür
    if (!currentWeight || !desiredWeight || currentWeight <= desiredWeight) {
      return 0;
    }
    
    // Toplam hedef kilo kaybı
    const totalWeightToLose = currentWeight - desiredWeight;
    
    // Eğer toplam hedef 0 veya negatifse 0 döndür
    if (totalWeightToLose <= 0) {
      return 0;
    }
    
    // İlerleme yüzdesi hesapla
    const progressPercentage = (weightLoss / totalWeightToLose) * 100;
    
    // 0-100 arasında sınırla
    return Math.max(0, Math.min(100, progressPercentage));
  };

  const progressPercentage = calculateProgressPercentage();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#2c3e50',
          font: {
            family: 'Verdana, sans-serif',
            size: 12,
            weight: '600',
          },
          padding: 20,
          usePointStyle: true,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#2c3e50',
        bodyColor: '#2c3e50',
        borderColor: '#FC842D',
        borderWidth: 2,
        cornerRadius: 8,
        titleFont: {
          family: 'Verdana, sans-serif',
          size: 14,
          weight: '700',
        },
        bodyFont: {
          family: 'Verdana, sans-serif',
          size: 12,
          weight: '600',
        },
        padding: 12,
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#666',
          font: {
            family: 'Verdana, sans-serif',
            size: 11,
            weight: '600',
          }
        },
        grid: {
          color: 'rgba(252, 132, 45, 0.1)',
          lineWidth: 1,
        },
        border: {
          color: 'rgba(252, 132, 45, 0.2)',
          width: 2,
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#666',
          font: {
            family: 'Verdana, sans-serif',
            size: 11,
            weight: '600',
          }
        },
        grid: {
          color: 'rgba(252, 132, 45, 0.1)',
          lineWidth: 1,
        },
        border: {
          color: 'rgba(252, 132, 45, 0.2)',
          width: 2,
        }
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        hoverRadius: 8,
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#2c3e50',
          font: {
            family: 'Verdana, sans-serif',
            size: 12,
            weight: '600',
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#2c3e50',
        bodyColor: '#2c3e50',
        borderColor: '#FC842D',
        borderWidth: 2,
        cornerRadius: 8,
        titleFont: {
          family: 'Verdana, sans-serif',
          size: 14,
          weight: '700',
        },
        bodyFont: {
          family: 'Verdana, sans-serif',
          size: 12,
          weight: '600',
        },
        padding: 12,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
            return `${label}: ${percentage}%`;
          }
        }
      }
    },
    cutout: '60%',
    elements: {
      arc: {
        borderWidth: 3,
        borderColor: '#ffffff',
        hoverBorderWidth: 4,
      }
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    }
  };

  // Get time-based greeting with icon
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: t('profile.greetings.goodMorning'), icon: <IoSunny /> };
    if (hour < 17) return { text: t('profile.greetings.goodAfternoon'), icon: <FaSun /> };
    if (hour < 21) return { text: t('profile.greetings.goodEvening'), icon: <FaMoon /> };
    return { text: t('profile.greetings.goodNight'), icon: <IoMoon /> };
  };

  // Get motivational message with icon based on user progress
  const getMotivationalMessage = () => {
    const streak = backendUserStats?.streak || backendUserStats?.currentStreak || activityStats?.currentStreak || 0;
    const weightLoss = backendUserStats?.weightLoss || userStats?.weightLoss || 0;
    
    if (streak >= 30) return { text: t('profile.motivational.onFire'), icon: <FaFire /> };
    if (streak >= 7) return { text: t('profile.motivational.greatStreak'), icon: <FaTrophy /> };
    if (weightLoss >= 5) return { text: t('profile.motivational.fantasticProgress'), icon: <FaStar /> };
    if (weightLoss > 0) return { text: t('profile.motivational.everyStepCounts'), icon: <FaHeart /> };
    return { text: t('profile.motivational.readyToCrush'), icon: <FaRocket /> };
  };

  // Get random encouraging icon
  const getRandomIcon = () => {
    const icons = [
      <HiSparkles />, 
      <FaStar />, 
      <FaGem />, 
      <FaBolt />, 
      <FaBullseye />, 
      <FaTrophy />, 
      <FaAward />, 
      <FaFire />
    ];
    return icons[Math.floor(Math.random() * icons.length)];
  };

  // Calculate member since date from createdAt
  const getMemberSinceDate = () => {
    if (!user?.createdAt) return t('profile.unknown');
    
    const createdDate = new Date(user.createdAt);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    return createdDate.toLocaleDateString(undefined, options);
  };

  // Format member since display
  const formatMemberSince = () => {
    const daysActive = getDaysActive();
    const memberSince = getMemberSinceDate();
    
    if (daysActive === 0) {
      return t('profile.joinedToday');
    } else if (daysActive === 1) {
      return t('profile.joinedYesterday');
    } else if (daysActive < 30) {
      return `${daysActive} ${t('profile.daysAgo')}`;
    } else {
      return memberSince;
    }
  };

  return (
    <div className={styles.profileContainer}>
      {isLoading && <Loader />}
      <div className={styles.profileHeader}>
        <div className={styles.headerContent}>
          <div className={styles.userAvatar}>
            <FaUser className={styles.avatarIcon} />
          </div>
          <div className={styles.userInfo}>
            <h1 className={styles.welcomeTitle}>
              <span className={styles.greeting}>
                {getTimeBasedGreeting().icon}
                {getTimeBasedGreeting().text}
              </span>
              <span className={styles.userName}>{user.name}!</span>
            </h1>
            <p className={styles.motivationalText}>
              {getMotivationalMessage().icon}
              {getMotivationalMessage().text}
            </p>
            <div className={styles.userStats}>
              <FaCrown className={styles.memberBadge} />
              <div className={styles.membershipInfo}>
                <HiSparkles className={styles.membershipIcon} />
                <span>{t('profile.memberSince')}</span>
                <span className={styles.daysCount}>{formatMemberSince()}</span>
              </div>
              {getDaysActive() > 0 && (
                <div className={styles.membershipInfo}>
                  <FaFire className={styles.membershipIcon} />
                  <span className={styles.daysCount}>{getDaysActive()}</span>
                  <span>{t('profile.daysActive')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.tabNavigation}>
        <button 
          className={`${styles.tab} ${activeTab === 'overview' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <FaChartLine /> {t('profile.overview')}
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'progress' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('progress')}
        >
          <FaBullseye /> {t('profile.progress')}
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'achievements' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('achievements')}
        >
          <FaTrophy /> {t('profile.achievements')}
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className={styles.overviewContent}>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statCardContent}>
                <div className={styles.statIcon}>
                  <FaFire />
                </div>
                <div className={styles.statInfo}>
                  <h3>{backendUserStats?.streak || activityStats?.currentStreak || userStats?.currentStreak || 0}</h3>
                  <p>{t('profile.dayStreak')}</p>
                </div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statCardContent}>
                <div className={styles.statIcon}>
                  <FaWeight />
                </div>
                <div className={styles.statInfo}>
                  <h3>
                    {backendUserStats?.weightLoss || 
                     userStats?.weightLoss || 
                     (userInfo?.currentWeight && userInfo?.desireWeight 
                       ? Math.max(0, (userInfo.currentWeight - userInfo.desireWeight)).toFixed(1)
                       : 0
                     )} {t('profile.kg')}
                  </h3>
                  <p>{t('profile.weightLoss')}</p>
                </div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statCardContent}>
                <div className={styles.statIcon}>
                  <FaBullseye />
                </div>
                <div className={styles.statInfo}>
                  <h3>{backendUserStats?.bmi || calculateBMI()}</h3>
                  <p>{t('profile.bmi')}</p>
                  <span className={styles.bmiCategory} style={{ color: getBMICategory(backendUserStats?.bmi || calculateBMI()).color }}>
                    {getBMICategory(backendUserStats?.bmi || calculateBMI()).category}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statCardContent}>
                <div className={styles.statIcon}>
                  <FaCalendarAlt />
                </div>
                <div className={styles.statInfo}>
                  <h3>
                    {backendUserStats?.averageDailyCalories || 
                     activityStats?.averageCaloriesPerDay || 
                     userInfo?.dailyRate || 
                     1850}
                  </h3>
                  <p>{t('profile.averageCalories')}</p>
                </div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statCardContent}>
                <div className={styles.statIcon}>
                  <FaHeart />
                </div>
                <div className={styles.statInfo}>
                  <h3>{backendUserStats?.daysActive || activityStats?.activeDays || 0}</h3>
                  <p>{t('profile.daysActive')}</p>
                </div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statCardContent}>
                <div className={styles.statIcon}>
                  <FaTrophy />
                </div>
                <div className={styles.statInfo}>
                  <h3>{backendUserStats?.totalEntries || activityStats?.totalEntries || 0}</h3>
                  <p>{t('profile.totalEntries')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.userDetailsGrid}>
            <div className={styles.userDetailsHeader}>
              <div className={styles.userDetailsIconWrapper}>
                <FaIdCard className={styles.userDetailsIcon} />
              </div>
              <h3 className={styles.userDetailsTitle}>{t('profile.personalInfo')}</h3>
            </div>
            <div className={styles.userDetailsContent}>
              <div className={styles.userDetail}>
                <span className={styles.label}>{t('profile.email')}:</span>
                <span className={styles.value}>{user.email}</span>
              </div>
              <div className={styles.userDetail}>
                <span className={styles.label}>{t('profile.height')}:</span>
                <span className={styles.value}>
                  {userInfo?.height ? `${userInfo.height} ${t('profile.cm')}` : t('profile.notSet')}
                </span>
              </div>
              <div className={styles.userDetail}>
                <span className={styles.label}>{t('profile.age')}:</span>
                <span className={styles.value}>
                  {userInfo?.age ? `${userInfo.age} ${t('profile.years')}` : t('profile.notSet')}
                </span>
              </div>
              <div className={styles.userDetail}>
                <span className={styles.label}>{t('profile.currentWeight')}:</span>
                <span className={styles.value}>
                  {userInfo?.currentWeight ? `${userInfo.currentWeight} ${t('profile.kg')}` : t('profile.notSet')}
                </span>
              </div>
              <div className={styles.userDetail}>
                <span className={styles.label}>{t('profile.desiredWeight')}:</span>
                <span className={styles.value}>
                  {userInfo?.desireWeight ? `${userInfo.desireWeight} ${t('profile.kg')}` : t('profile.notSet')}
                </span>
              </div>
              <div className={styles.userDetail}>
                <span className={styles.label}>{t('profile.bloodType')}:</span>
                <span className={styles.value}>
                  {userInfo?.bloodType ? t(`bloodTypes.${userInfo.bloodType}`) : t('profile.notSet')}
                </span>
              </div>
              <div className={styles.userDetail}>
                <span className={styles.label}>{t('profile.dailyCalorieRate')}:</span>
                <span className={styles.value}>
                  {userInfo?.dailyRate ? `${userInfo.dailyRate} ${t('profile.kcal')}` : t('profile.notCalculated')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'progress' && (
        <div className={styles.progressContent}>
          <div className={styles.progressSection}>
            <h3>{t('profile.weightProgress')}</h3>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${progressPercentage}%` }}>
                <span className={styles.progressText}>{progressPercentage.toFixed(1)}%</span>
              </div>
            </div>
            <p className={styles.progressInfo}>
              {userInfo?.desireWeight 
                ? `${(userInfo.currentWeight - userInfo.desireWeight).toFixed(1)} ${t('profile.kg')} ${t('profile.toGo')}`
                : t('profile.setGoalFirst')
              }
            </p>
          </div>

          <div className={styles.chartsGrid}>
            <div className={styles.chartCard}>
              <h3>{t('profile.macroBreakdown')}</h3>
              <div className={styles.chartContainer}>
                <Doughnut data={macroData} options={doughnutOptions} />
              </div>
            </div>

            <div className={styles.chartCard}>
              <h3>{t('profile.weeklyCalories')}</h3>
              <div className={styles.chartContainer}>
                <Line data={weeklyData} options={chartOptions} />
              </div>
            </div>

            <div className={styles.chartCard}>
              <h3>{t('profile.weightTrend')}</h3>
              <div className={styles.chartContainer}>
                <Bar data={weightProgress} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className={styles.achievementsContent}>
          <h3>{t('profile.yourAchievements')}</h3>
          
          <div className={styles.achievementsGrid}>
            {achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`${styles.achievementCard} ${achievement.earned ? styles.earned : styles.locked}`}
                data-category={achievement.category}
              >
                <div className={styles.achievementHeader}>
                  <div className={styles.achievementIcon}>
                    {achievement.earned ? achievement.icon : <FaLock />}
                  </div>
                  <div className={styles.achievementInfo}>
                    <h4>{t(`profile.${achievement.name}`)}</h4>
                    <p className={styles.achievementRequirement}>
                      {achievement.requirement}
                    </p>
                  </div>
                  {achievement.earned && <FaMedal className={styles.medalIcon} />}
                </div>
                {!achievement.earned && (
                  <div className={styles.progressSection}>
                    <div className={styles.progressBar}>
                      <div 
                        className={styles.progressFill} 
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </div>
                    <span className={styles.progressText}>
                      {achievement.progress}% {t('profile.complete')}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.achievementGuide}>
            <h4>{t('profile.howToUnlock')}</h4>
            <div className={styles.guideList}>
              <div className={styles.guideItem}>
                <span className={styles.guideIcon}><FaCalendarCheck /></span>
                <div className={styles.guideText}>
                  <strong>{t('profile.dailyLogging')}:</strong> {t('profile.dailyLoggingDesc')}
                </div>
              </div>
              <div className={styles.guideItem}>
                <span className={styles.guideIcon}><FaFire /></span>
                <div className={styles.guideText}>
                  <strong>{t('profile.consistency')}:</strong> {t('profile.consistencyDesc')}
                </div>
              </div>
              <div className={styles.guideItem}>
                <span className={styles.guideIcon}><FaUtensils /></span>
                <div className={styles.guideText}>
                  <strong>{t('profile.foodTracking')}:</strong> {t('profile.foodTrackingDesc')}
                </div>
              </div>
              <div className={styles.guideItem}>
                <span className={styles.guideIcon}><FaBalanceScale /></span>
                <div className={styles.guideText}>
                  <strong>{t('profile.weightGoals')}:</strong> {t('profile.weightGoalsDesc')}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;