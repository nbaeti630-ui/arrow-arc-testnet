// @ts-nocheck
import React, { useState } from "react";

// --- GAYA DESAIN PINK MODERN (DIPINDAH KE ATAS AGAR VERCEL TIDAK ERROR) ---
const styles = {
  container: { minHeight: "100vh", backgroundColor: "#fff0f5", color: "#333333", fontFamily: "system-ui, -apple-system, sans-serif", display: "flex", flexDirection: "column", alignItems: "center" },
  header: { width: "100%", maxWidth: "1200px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", boxSizing: "border-box" },
  logoContainer: { display: "flex", alignItems: "center", gap: "8px" },
  liveIndicator: { width: "10px", height: "10px", backgroundColor: "#ff1493", borderRadius: "50%", boxShadow: "0 0 8px #ff1493" },
  logoText: { fontSize: "24px", fontWeight: "900", color: "#ff1493", letterSpacing: "0.5px", fontStyle: "italic" },
  logoBadge: { backgroundColor: "#ffb6c1", color: "#b03060", fontSize: "10px", padding: "3px 6px", borderRadius: "6px", fontWeight: "bold" },
  connectButton: { backgroundColor: "#ff69b4", color: "#ffffff", border: "2px solid transparent", padding: "10px 20px", borderRadius: "20px", fontWeight: "bold", cursor: "pointer" },
  connectedButton: { backgroundColor: "#ffe4e1", color: "#ff1493", border: "1px solid #ffb6c1", padding: "10px 20px", borderRadius: "20px", fontWeight: "bold", cursor: "pointer" },
  navContainer: { display: "flex", gap: "5px", backgroundColor: "#ffe4e1", padding: "6px", borderRadius: "20px", marginTop: "20px" },
  activeTab: { padding: "10px 24px", backgroundColor: "#ff1493", borderRadius: "15px", fontWeight: "bold", color: "#ffffff", cursor: "pointer", boxShadow: "0 2px 5px rgba(255, 20, 147, 0.2)", transition: "all 0.3s ease" },
  inactiveTab: { padding: "10px 24px", fontWeight: "bold", color: "#c71585", cursor: "pointer", transition: "all 0.3s ease" },
  mainArea: { flex: 1, display: "flex", justifyContent: "center", alignItems: "center", width: "100%", padding: "20px", boxSizing: "border-box" },
  card: { backgroundColor: "#ffffff", width: "100%", maxWidth: "460px", borderRadius: "24px", padding: "20px", boxShadow: "0 10px 40px rgba(255, 105, 180, 0.2)", border: "1px solid #ffb6c1", transition: "all 0.3s ease", zIndex: 1 },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  cardTitle: { margin: 0, fontSize: "18px", color: "#333", fontWeight: "bold" },
  settingsIcon: { cursor: "pointer" },
  inputBox: { backgroundColor: "#fff0f5", borderRadius: "16px", padding: "16px", border: "1px solid #ffe4e1" },
  inputLabel: { color: "#b03060", fontSize: "14px", marginBottom: "10px", fontWeight: "500" },
  inputRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  inputField: { backgroundColor: "transparent", border: "none", color: "#333", fontSize: "32px", outline: "none", width: "60%", fontWeight: "bold" },
  networkName: { fontSize: "18px", fontWeight: "bold", color: "#333" },
  tokenButton: { display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#ffffff", border: "1px solid #ffb6c1", color: "#333", padding: "8px 16px", borderRadius: "20px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", boxShadow: "0 2px 4px rgba(255, 182, 193, 0.1)" },
  tokenIcon: { fontSize: "18px" },
  balanceText: { color: "#c71585", fontSize: "12px", textAlign: "right", marginTop: "8px" },
  arrowContainer: { display: "flex", justifyContent: "center", margin: "-10px 0", position: "relative", zIndex: 1 },
  arrowIcon: { backgroundColor: "#ff1493", color: "#ffffff", width: "36px", height: "36px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "10px", border: "4px solid #ffffff", cursor: "pointer", fontWeight: "bold", fontSize: "18px", boxShadow: "0 2px 8px rgba(255, 20, 147, 0.3)" },
  actionButton: { width: "100%", backgroundColor: "#ff1493", color: "#ffffff", padding: "16px", borderRadius: "16px", fontSize: "18px", fontWeight: "bold", marginTop: "20px", cursor: "pointer", border: "none" },
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(255, 182, 193, 0.4)", backdropFilter: "blur(4px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
  modalContent: { backgroundColor: "#ffffff", width: "90%", maxWidth: "400px", borderRadius: "24px", padding: "20px", boxShadow: "0 10px 50px rgba(255, 20, 147, 0.3)", border: "1px solid #ffb6c1" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  closeButton: { background: "none", border: "none", fontSize: "20px", fontWeight: "bold", color: "#ff1493", cursor: "pointer" },
  tokenListContainer: { display: "flex", flexDirection: "column", gap: "10px", maxHeight: "300px", overflowY: "auto" },
  tokenListItem: { display: "flex", alignItems: "center", gap: "15px", padding: "12px", borderRadius: "16px", cursor: "pointer", border: "1px solid transparent" }
};

// DAFTAR KOIN (TERMASUK ARC TESTNET)
const tokenList = [
  { symbol: "ARC", icon: "⚡", name: "Arc Token" },
  { symbol: "ARROW", icon: "🌸", name: "Arrow Token" },
  { symbol: "ETH", icon: "🔵", name: "Ethereum" },
  { symbol: "USDC", icon: "💵", name: "USD Coin" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("Swap");
  
  const [topToken, setTopToken] = useState(tokenList[2]); // Default ETH
  const [bottomToken, setBottomToken] = useState(tokenList[0]); // Default ARC

  const [walletAddress, setWalletAddress] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectingFor, setSelectingFor] = useState(null);

  const handleFlipTokens = () => {
    setTopToken(bottomToken);
    setBottomToken(topToken);
  };

  const handleConnectWallet = () => {
    setWalletAddress("0x71C...97d1");
  };

  const openTokenModal = (side) => {
    setSelectingFor(side);
    setIsModalOpen(true);
  };

  const handleSelectToken = (token) => {
    if (selectingFor === "top") {
      setTopToken(token);
    } else {
      setBottomToken(token);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <style>{`
        @keyframes blinkAnim { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes neonPulse { 0%, 100% { box-shadow: 0 0 10px #ffb6c1, 0 0 20px #ff69b4; border-color: #ff69b4; } 50% { box-shadow: 0 0 20px #ff69b4, 0 0 35px #ff1493; border-color: #ff1493; } }
        .blinking-dot { animation: blinkAnim 1.2s infinite ease-in-out; }
        .neon-button { animation: neonPulse 2s infinite ease-in-out; transition: all 0.3s ease; }
        .neon-button:hover { transform: translateY(-2px); filter: brightness(1.1); }
        .flip-arrow { transition: transform 0.3s ease; }
        .flip-arrow:active { transform: rotate(180deg); }
        .token-item { transition: all 0.2s ease; }
        .token-item:hover { background-color: #fff0f5; transform: translateX(5px); }
      `}</style>
      
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.logoContainer}>
            <div style={styles.liveIndicator} className="blinking-dot"></div>
            <span style={styles.logoText}>Arrow</span>
            <span style={styles.logoBadge}>ARC</span>
          </div>
          <button style={walletAddress ? styles.connectedButton : styles.connectButton} className={walletAddress ? "" : "neon-button"} onClick={handleConnectWallet}>
            {walletAddress ? `🟢 ${walletAddress}` : "Connect Wallet"}
          </button>
        </header>

        <div style={styles.navContainer}>
          <div style={activeTab === "Swap" ? styles.activeTab : styles.inactiveTab} onClick={() => setActiveTab("Swap")}>Swap</div>
          <div style={activeTab === "Bridge" ? styles.activeTab : styles.inactiveTab} onClick={() => setActiveTab("Bridge")}>Bridge</div>
        </div>

        <main style={styles.mainArea}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>{activeTab}</h2>
              <span style={styles.settingsIcon}>⚙️</span>
            </div>

            {activeTab === "Swap" && (
              <>
                <div style={styles.inputBox}>
                  <div style={styles.inputLabel}>You pay</div>
                  <div style={styles.inputRow}>
                    <input type="number" placeholder="0" style={styles.inputField} />
                    <button style={styles.tokenButton} onClick={() => openTokenModal("top")}>
                      <span style={styles.tokenIcon}>{topToken.icon}</span> {topToken.symbol} ⏷
                    </button>
                  </div>
                  <div style={styles.balanceText}>Balance: {walletAddress ? "2.50" : "0.00"}</div>
                </div>

                <div style={styles.arrowContainer}>
                  <div style={styles.arrowIcon} className="flip-arrow" onClick={handleFlipTokens}>↓</div>
                </div>

                <div style={styles.inputBox}>
                  <div style={styles.inputLabel}>You receive</div>
                  <div style={styles.inputRow}>
                    <input type="number" placeholder="0" style={styles.inputField} disabled />
                    <button style={styles.tokenButton} onClick={() => openTokenModal("bottom")}>
                      <span style={styles.tokenIcon}>{bottomToken.icon}</span> {bottomToken.symbol} ⏷
                    </button>
                  </div>
                  <div style={styles.balanceText}>Balance: {walletAddress ? "15,000" : "0.00"}</div>
                </div>

                <button style={styles.actionButton} className={walletAddress ? "neon-button" : ""}>
                  {walletAddress ? "Swap Now" : "Connect Wallet to Swap"}
                </button>
              </>
            )}

            {activeTab === "Bridge" && (
              <>
                <div style={styles.inputBox}>
                  <div style={styles.inputLabel}>From Network</div>
                  <div style={styles.inputRow}>
                    <div style={styles.networkName}>🌐 Ethereum Mainnet</div>
                  </div>
                </div>

                <div style={styles.arrowContainer}>
                  <div style={styles.arrowIcon}>↓</div>
                </div>

                <div style={styles.inputBox}>
                  <div style={styles.inputLabel}>To Network</div>
                  <div style={styles.inputRow}>
                    <div style={styles.networkName}>⚡ Arc Testnet</div>
                  </div>
                </div>
                
                <div style={{ marginTop: "20px" }}>
                   <div style={styles.inputBox}>
                    <div style={styles.inputLabel}>Amount to send</div>
                    <div style={styles.inputRow}>
                      <input type="number" placeholder="0" style={styles.inputField} />
                      <button style={styles.tokenButton}>
                        <span style={styles.tokenIcon}>🌸</span> ARROW
                      </button>
                    </div>
                  </div>
                </div>

                <button style={styles.actionButton} className={walletAddress ? "neon-button" : ""}>
                   {walletAddress ? "Bridge Funds" : "Connect Wallet to Bridge"}
                </button>
              </>
            )}
          </div>
        </main>
      </div>

      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h3 style={{ margin: 0, color: "#333" }}>Select a token</h3>
              <button style={styles.closeButton} onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            
            <div style={styles.tokenListContainer}>
              {tokenList.map((token, index) => (
                <div key={index} style={styles.tokenListItem} className="token-item" onClick={() => handleSelectToken(token)}>
                  <span style={{ fontSize: "24px" }}>{token.icon}</span>
                  <div>
                    <div style={{ fontWeight: "bold", color: "#333" }}>{token.symbol}</div>
                    <div style={{ fontSize: "12px", color: "#888" }}>{token.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
