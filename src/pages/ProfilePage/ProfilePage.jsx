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
  FaHeart
} from 'react-icons/fa';
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
  selectDetailedWeeklyData,
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
  getDetailedWeeklyCalories,
  getUserStatsFromBackend,
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
  const detailedWeeklyData = useSelector(selectDetailedWeeklyData);
  const dailyRate = useSelector(selectDailyRate);
  const isLoading = useSelector(selectProductsLoading);
  
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch all data when component mounts
  useEffect(() => {
    // Try to get comprehensive data from backend first
    dispatch(getUserStatsFromBackend());
    dispatch(getUserActivityStats());
    dispatch(getWeightHistory());
    dispatch(getMacroBreakdown('7days'));
    dispatch(getUserAchievements());
    dispatch(getDetailedWeeklyCalories());
    
    // Fallback to manual calculations if backend endpoints don't exist
    dispatch(getWeeklyCalories());
    dispatch(getWeightProgress());
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
      },
      {
        label: t('profile.calorieGoal'),
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: '#9b9faa',
        backgroundColor: 'rgba(155, 159, 170, 0.1)',
        borderDash: [5, 5],
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
        borderRadius: 8,
      }
    ],
  });

  const [macroData, setMacroData] = useState({
    labels: [t('profile.carbs'), t('profile.protein'), t('profile.fat')],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      }
    ],
  });

  // Update chart data when backend data arrives
  useEffect(() => {
    // Use detailed weekly data if available, otherwise fallback to simple weekly data
    const weeklySource = detailedWeeklyData.length > 0 ? detailedWeeklyData : weeklyCaloriesData;
    
    if (weeklySource && weeklySource.length > 0) {
      const caloriesData = weeklySource.map(day => day.calories || 0);
      const goalData = new Array(7).fill(dailyRate || userInfo?.dailyRate || enhancedUserStats.averageDailyCalories || 1850);
      
      setWeeklyData(prev => ({
        ...prev,
        datasets: [
          {
            ...prev.datasets[0],
            data: caloriesData,
            label: t('profile.caloriesConsumed'),
          },
          {
            ...prev.datasets[1],
            data: goalData,
            label: t('profile.calorieGoal'),
          }
        ]
      }));
    }
  }, [weeklyCaloriesData, detailedWeeklyData, dailyRate, userInfo?.dailyRate, enhancedUserStats.averageDailyCalories, t]);

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
          }
        ]
      }));
    }
  }, [weightProgressData, formattedWeightHistory, t]);

  useEffect(() => {
    // Use backend macro data if available
    if (formattedMacroData && formattedMacroData.data.length > 0) {
      setMacroData(prev => ({
        labels: [t('profile.carbs'), t('profile.protein'), t('profile.fat')],
        datasets: [
          {
            ...prev.datasets[0],
            data: formattedMacroData.data,
          }
        ]
      }));
    } else {
      // Fallback to default values
      setMacroData(prev => ({
        ...prev,
        labels: [t('profile.carbs'), t('profile.protein'), t('profile.fat')],
      }));
    }
  }, [formattedMacroData, t]);

  // Use backend achievements if available, otherwise fallback to calculated ones
  const achievements = userAchievements.length > 0 ? userAchievements : [
    { 
      id: 1, 
      name: 'firstWeek', 
      icon: '🎯', 
      earned: enhancedUserStats.daysActive >= 7 || enhancedUserStats.totalDays >= 7,
      description: t('profile.firstWeekDesc'),
    },
    { 
      id: 2, 
      name: 'streakMaster', 
      icon: '🔥', 
      earned: enhancedUserStats.streak >= 7 || enhancedUserStats.currentStreak >= 7,
      description: t('profile.streakMasterDesc'),
    },
    { 
      id: 3, 
      name: 'goalReacher', 
      icon: '🏆', 
      earned: enhancedUserStats.streak >= 30 || enhancedUserStats.bestStreak >= 30,
      description: t('profile.goalReacherDesc'),
    },
    { 
      id: 4, 
      name: 'healthyEater', 
      icon: '🥗', 
      earned: enhancedUserStats.totalEntries >= 50,
      description: t('profile.healthyEaterDesc'),
    },
    { 
      id: 5, 
      name: 'weightLoss5kg', 
      icon: '⚖️', 
      earned: enhancedUserStats.weightLoss >= 5,
      description: t('profile.weightLoss5kgDesc'),
    },
    { 
      id: 6, 
      name: 'monthlyChamp', 
      icon: '👑', 
      earned: enhancedUserStats.daysActive >= 30 || enhancedUserStats.totalDays >= 30,
      description: t('profile.monthlyChampDesc'),
    },
  ];

  const calculateBMI = () => {
    if (userInfo?.height && userInfo?.currentWeight) {
      const heightInM = userInfo.height / 100;
      return (userInfo.currentWeight / (heightInM * heightInM)).toFixed(1);
    }
    return enhancedUserStats.bmi || userStats.bmi;
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: t('profile.underweight'), color: '#3498db' };
    if (bmi < 25) return { category: t('profile.normal'), color: '#2ecc71' };
    if (bmi < 30) return { category: t('profile.overweight'), color: '#f39c12' };
    return { category: t('profile.obese'), color: '#e74c3c' };
  };

  const progressPercentage = userInfo?.desireWeight && userInfo?.currentWeight 
    ? Math.max(0, Math.min(100, ((userInfo.currentWeight - userInfo.desireWeight) / (userInfo.currentWeight - userInfo.desireWeight + enhancedUserStats.weightLoss)) * 100))
    : 0;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  // Get time-based greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '🌅 Good Morning';
    if (hour < 17) return '☀️ Good Afternoon';
    if (hour < 21) return '🌆 Good Evening';
    return '🌙 Good Night';
  };

  // Get motivational message based on user progress
  const getMotivationalMessage = () => {
    const streak = enhancedUserStats.streak || enhancedUserStats.currentStreak || 0;
    const weightLoss = enhancedUserStats.weightLoss || 0;
    
    if (streak >= 30) return "🔥 You're on fire! Amazing consistency!";
    if (streak >= 7) return "💪 Great streak! Keep it up!";
    if (weightLoss >= 5) return "🎉 Fantastic progress on your journey!";
    if (weightLoss > 0) return "⭐ Every step counts! You're doing great!";
    return "🚀 Ready to crush your goals today?";
  };

  // Get random encouraging emoji
  const getRandomEmoji = () => {
    const emojis = ['✨', '🌟', '💫', '⚡', '🎯', '🏆', '💎', '🔥'];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  return (
    <div className={styles.profileContainer}>
      {isLoading && <Loader />}
      <div className={styles.profileHeader}>
        <div className={styles.userAvatar}>
          <FaUser className={styles.avatarIcon} />
          <div className={styles.avatarBadge}>
            <FaHeart className={styles.heartIcon} />
          </div>
        </div>
        <div className={styles.userInfo}>
          <div className={styles.welcomeContainer}>
            <h1 className={styles.welcomeTitle}>
              <span className={styles.greeting}>{getTimeBasedGreeting()}</span>
              <span className={styles.userName}>{user.name}!</span>
              <span className={styles.dynamicEmoji}>{getRandomEmoji()}</span>
            </h1>
            <p className={styles.motivationalText}>
              {getMotivationalMessage()}
            </p>
          </div>
          <p className={styles.userStats}>
            <span className={styles.memberBadge}>👑</span>
            {t('profile.memberSince')} • 
            <span className={styles.daysCount}>
              {enhancedUserStats.daysActive || enhancedUserStats.totalDays || 0}
            </span> 
            {t('profile.daysActive')}
          </p>
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
              <div className={styles.statIcon}>
                <FaFire />
              </div>
              <div className={styles.statInfo}>
                <h3>{enhancedUserStats.streak || enhancedUserStats.currentStreak || 0}</h3>
                <p>{t('profile.dayStreak')}</p>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <FaWeight />
              </div>
              <div className={styles.statInfo}>
                <h3>{enhancedUserStats.weightLoss || 0} {t('profile.kg')}</h3>
                <p>{t('profile.weightLost')}</p>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <FaBullseye />
              </div>
              <div className={styles.statInfo}>
                <h3>{calculateBMI()}</h3>
                <p>{t('profile.bmi')}</p>
                <span className={styles.bmiCategory} style={{ color: getBMICategory(calculateBMI()).color }}>
                  {getBMICategory(calculateBMI()).category}
                </span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <FaCalendarAlt />
              </div>
              <div className={styles.statInfo}>
                <h3>{enhancedUserStats.averageDailyCalories || enhancedUserStats.averageCaloriesPerDay || userInfo?.dailyRate || 1850}</h3>
                <p>{t('profile.avgCalories')}</p>
              </div>
            </div>
          </div>

          <div className={styles.userDetailsGrid}>
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
              <h3>{t('profile.weeklyCalories')}</h3>
              <Line data={weeklyData} options={chartOptions} />
            </div>

            <div className={styles.chartCard}>
              <h3>{t('profile.weightTrend')}</h3>
              <Bar data={weightProgress} options={chartOptions} />
            </div>

            <div className={styles.chartCard}>
              <h3>{t('profile.macroBreakdown')}</h3>
              <Doughnut data={macroData} />
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
              >
                <div className={styles.achievementIcon}>
                  {achievement.earned ? achievement.icon : '🔒'}
                </div>
                <h4>{t(`profile.${achievement.name}`)}</h4>
                {achievement.earned && <FaMedal className={styles.medalIcon} />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage; 