import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    
    // Simulating the API call structure from your original code
    const token = localStorage?.getItem("access_token");
    if (!token) {
      // In your app: window.location.href = "/login";
      console.log("No token found, would redirect to login");
      return;
    }

    axios
        .get("http://127.0.0.1:8000/api/protected/me", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            setUser(res.data);
            setLoading(false);
        })
        .catch(() => {
            window.location.href = "/login";
        });


    // Your original axios call would go here:
    /*
    axios
      .get("http://127.0.0.1:8000/api/protected/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        window.location.href = "/login";
      });
    */
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingCard}>
          <div style={styles.loadingSpinner}></div>
          <p style={styles.loadingText}>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleLogout = () => {
    // In your app:
    // localStorage.removeItem("access_token");
    // window.location.href = "/login";
    console.log("Would logout and redirect to login");
  };

  return (
    <div style={styles.dashboardContainer}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <div style={styles.navLinks}>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.welcomeTitle}>Welcome back!</h1>
          <p style={styles.subtitle}>Here's your account overview</p>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.mainContent}>
        {/* User Info Card */}
        <div style={styles.userCard}>
          <div style={styles.avatarSection}>
            <div style={styles.avatar}>
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div style={styles.userInfo}>
              <h2 style={styles.userName}>{user.username}</h2>
              <span style={styles.userRole}>{user.role}</span>
            </div>
          </div>
          
          <div style={styles.userDetails}>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Email Address</span>
              <span style={styles.detailValue}>{user.email}</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Account Type</span>
              <span style={styles.detailValue}>{user.role}</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Status</span>
              <span style={{...styles.detailValue, ...styles.statusActive}}>Active</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>📚</div>
            <div style={styles.statContent}>
              <h3 style={styles.statNumber}>12</h3>
              <p style={styles.statLabel}>Courses Enrolled</p>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>🏆</div>
            <div style={styles.statContent}>
              <h3 style={styles.statNumber}>8</h3>
              <p style={styles.statLabel}>Completed</p>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>⏱️</div>
            <div style={styles.statContent}>
              <h3 style={styles.statNumber}>45h</h3>
              <p style={styles.statLabel}>Study Time</p>
            </div>
          </div>
        </div>

        {/* Actions Card */}
        <div style={styles.actionsCard}>
          <h3 style={styles.actionsTitle}>Account Actions</h3>
          <div style={styles.buttonGroup}>
            <button
              style={styles.btnSecondary}
              onClick={handleEditProfile}
              onMouseOver={(e) => e.target.style.backgroundColor = '#e2e8f0'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#f0ede6'}
            >
              <span style={styles.buttonIcon}>✏️</span>
              Edit Profile
            </button>
            <button
              style={styles.btnPrimary}
              onClick={handleLogout}
              onMouseOver={(e) => e.target.style.backgroundColor = '#2c5282'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#3182ce'}
            >
              <span style={styles.buttonIcon}>🚪</span>
              Logout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  dashboardContainer: {
    minHeight: '100vh',
    backgroundColor: '#f8f6f0',
    fontFamily: "'Open Sans', 'Verdana', 'Tahoma', 'Arial', sans-serif",
    lineHeight: '1.5',
    letterSpacing: '0.02em',
    wordSpacing: '0.16em',
  },
  
  nav: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    padding: '1rem 0',
  },
  
  navContent: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 1.5rem',
  },
  
  navLinks: {
    display: 'flex',
    gap: '2rem',
  },
  
  navLink: {
    color: '#3182ce',
    textDecoration: 'none',
    fontWeight: '500',
    borderBottom: '2px solid #3182ce',
    padding: '0.25rem 0',
    transition: 'all 0.2s ease',
  },
  
  loadingContainer: {
    minHeight: '100vh',
    backgroundColor: '#f8f6f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  },
  
  loadingCard: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '300px',
    width: '100%',
    border: '1px solid #e2e8f0',
  },
  
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #e2e8f0',
    borderTop: '4px solid #3182ce',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 1rem',
  },
  
  loadingText: {
    color: '#4a5568',
    fontSize: '1rem',
    margin: 0,
  },
  
  header: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    padding: '2rem 0',
  },
  
  headerContent: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 1.5rem',
  },
  
  welcomeTitle: {
    fontSize: '2rem',
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: '0.5rem',
    letterSpacing: '0.01em',
    lineHeight: '1.3',
  },
  
  subtitle: {
    color: '#718096',
    fontSize: '1.1rem',
    margin: 0,
  },
  
  mainContent: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  
  userCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  
  avatarSection: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1.5rem',
    gap: '1rem',
  },
  
  avatar: {
    width: '60px',
    height: '60px',
    backgroundColor: '#3182ce',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    fontWeight: '600',
  },
  
  userInfo: {
    flex: 1,
  },
  
  userName: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#2d3748',
    margin: '0 0 0.25rem 0',
    letterSpacing: '0.01em',
  },
  
  userRole: {
    color: '#805ad5',
    fontSize: '0.9rem',
    fontWeight: '500',
    textTransform: 'capitalize',
    backgroundColor: '#f7fafc',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
  },
  
  userDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  
  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem',
    backgroundColor: '#f8f6f0',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
  },
  
  detailLabel: {
    fontWeight: '600',
    color: '#4a5568',
    fontSize: '0.9rem',
  },
  
  detailValue: {
    color: '#2d3748',
    fontSize: '1rem',
    fontWeight: '500',
  },
  
  statusActive: {
    color: '#38a169',
    fontWeight: '600',
  },
  
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
  },
  
  statCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  
  statIcon: {
    fontSize: '2rem',
  },
  
  statContent: {
    flex: 1,
  },
  
  statNumber: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#2d3748',
    margin: '0 0 0.25rem 0',
  },
  
  statLabel: {
    color: '#718096',
    fontSize: '0.9rem',
    margin: 0,
  },
  
  actionsCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  
  actionsTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: '1rem',
    letterSpacing: '0.01em',
  },
  
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  
  btnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    fontFamily: 'inherit',
    letterSpacing: '0.02em',
    textAlign: 'center',
    textDecoration: 'none',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minHeight: '44px',
    backgroundColor: '#3182ce',
    color: 'white',
  },
  
  btnSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    fontFamily: 'inherit',
    letterSpacing: '0.02em',
    textAlign: 'center',
    textDecoration: 'none',
    border: '2px solid #cbd5e0',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minHeight: '44px',
    backgroundColor: '#f0ede6',
    color: '#2d3748',
  },
  
  buttonIcon: {
    fontSize: '1rem',
  },
};

// Add keyframes for loading spinner
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @media (max-width: 768px) {
    .statsGrid {
      grid-template-columns: 1fr;
    }
    
    .buttonGroup {
      flex-direction: column;
    }
    
    .avatarSection {
      flex-direction: column;
      text-align: center;
    }
    
    .detailItem {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
  }
`;
document.head.appendChild(styleSheet);