import { useState, useEffect } from "react";
import api from "./services/api";

function App() {
  const [tab, setTab] = useState("invited");
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    loadLeads();
  }, [tab]);

  const loadLeads = async () => {
    try {
      const response = await api.get(`/${tab}`);
      setLeads(response.data);
    } catch (error) {
      console.error("Error loading leads:", error);
    }
  };

  const acceptLead = async (id) => {
    try {
      await api.post(`/${id}/accept`);
      loadLeads();
    } catch (error) {
      console.error("Error accepting lead:", error);
    }
  };

  const declineLead = async (id) => {
    try {
      await api.post(`/${id}/decline`);
      loadLeads();
    } catch (error) {
      console.error("Error declining lead:", error);
    }
  };

  return (
    <div style={styles.appContainer}>
      <div style={styles.container}>
        <div style={styles.tabContainer}>
          <button
            onClick={() => setTab("invited")}
            style={{ ...styles.tabButton, ...(tab === "invited" && styles.activeTabButton) }}
          >
            Invited
          </button>
          <button
            onClick={() => setTab("accepted")}
            style={{ ...styles.tabButton, ...(tab === "accepted" && styles.activeTabButton) }}
          >
            Accepted
          </button>
        </div>

        <div style={styles.leadsContainer}>
          {leads.length > 0 ? (
            leads.map((lead) => (
              <div key={lead.id} style={styles.leadCard}>
                <div style={styles.cardHeader}>
                  <div style={styles.avatar}>{lead.firstName ? lead.firstName.charAt(0) : ''}</div>
                  <div style={styles.headerInfo}>
                    <div style={styles.name}>
                      {tab === "accepted"
                        ? `${lead.firstName} ${lead.lastName}`
                        : lead.firstName}
                    </div>
                    <div style={styles.date}>
                      {lead.createdAt
                        ? new Date(lead.createdAt).toLocaleString()
                        : "Date not available"}
                    </div>
                  </div>
                </div>
                <div style={styles.cardBody}>
                  <div style={styles.detailRow}>
                    <span style={styles.icon}>📍</span>
                    <span>{lead.suburb}</span>
                    <span style={{ ...styles.icon, marginLeft: '15px' }}>🛠️</span>
                    <span>{lead.category}</span>
                    <span style={styles.jobId}>Job ID: {lead.id}</span>
                  </div>
                  {tab === "accepted" && (
                    <div style={styles.detailRow}>
                      <span style={styles.icon}>📞</span>
                      <span>{lead.phoneNumber}</span>
                      <span style={{ ...styles.icon, marginLeft: '15px' }}>📧</span>
                      <span>{lead.email}</span>
                    </div>
                  )}
                  <p style={styles.description}>{lead.description}</p>
                </div>
                <div style={styles.cardActions}>
                  {tab === "invited" ? (
                    <>
                      <button onClick={() => acceptLead(lead.id)} style={styles.acceptButton}>
                        Accept
                      </button>
                      <button onClick={() => declineLead(lead.id)} style={styles.declineButton}>
                        Decline
                      </button>
                      <span style={styles.leadPrice}>${lead.price} Lead Invitation</span>
                    </>
                  ) : (
                    <span style={styles.leadPrice}>${lead.price} Lead Accepted</span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', color: '#666' }}>No leads found for this tab.</p>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    justifyContent: 'center', // Centraliza horizontalmente
    alignItems: 'center',     // Centraliza verticalmente
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    boxSizing: 'border-box',
  },
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fff',
    maxWidth: '400px', // Reduz a largura para ficar como na imagem
    width: '100%',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  },
  tabContainer: {
    display: 'flex',
    borderBottom: '1px solid #e0e0e0',
    backgroundColor: '#fff',
    borderRadius: '8px 8px 0 0',
    overflow: 'hidden',
  },
  tabButton: {
    flex: '1',
    padding: '15px 20px',
    border: 'none',
    backgroundColor: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    outline: 'none',
    color: '#888',
    fontWeight: 'normal',
    transition: 'all 0.3s ease',
    borderBottom: '2px solid transparent',
  },
  activeTabButton: {
    color: '#F27C34',
    fontWeight: 'bold',
    borderBottom: '2px solid #F27C34',
  },
  leadsContainer: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '0 0 8px 8px',
  },
  leadCard: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    marginBottom: '15px',
    backgroundColor: '#fff',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    borderBottom: '1px solid #eee',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#F27C34',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    marginRight: '10px',
  },
  headerInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  name: {
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#333',
  },
  date: {
    fontSize: '12px',
    color: '#888',
  },
  cardBody: {
    padding: '15px',
  },
  detailRow: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#666',
    marginBottom: '8px',
  },
  icon: {
    marginRight: '5px',
    fontSize: '16px',
    lineHeight: '1',
  },
  jobId: {
    marginLeft: 'auto',
    backgroundColor: '#f0f0f0',
    padding: '3px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    color: '#555',
  },
  description: {
    fontSize: '14px',
    color: '#444',
    lineHeight: '1.5',
    marginTop: '10px',
    marginBottom: '0',
  },
  cardActions: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    borderTop: '1px solid #eee',
    backgroundColor: '#fcfcfc',
  },
  acceptButton: {
    backgroundColor: '#F27C34',
    color: '#fff',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    marginRight: '10px',
  },
  declineButton: {
    backgroundColor: '#fff',
    color: '#666',
    border: '1px solid #ccc',
    padding: '9px 17px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.2s ease, color 0.2s ease',
  },
  leadPrice: {
    marginLeft: 'auto',
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#555',
  },
};

export default App;