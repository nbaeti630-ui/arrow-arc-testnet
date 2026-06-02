// @ts-nocheck
import React, { useState, useEffect } from "react";

// --- GAYA DESAIN PINK MODERN & FUTURISTIK ---
const styles = {
  container: { minHeight: "100vh", backgroundColor: "#fff0f5", color: "#333333", fontFamily: "system-ui, -apple-system, sans-serif", display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "40px" },
  header: { width: "100%", maxWidth: "1200px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", boxSizing: "border-box" },
  logoContainer: { display: "flex", alignItems: "center", gap: "8px" },
  liveIndicator: { width: "10px", height: "10px", backgroundColor: "#ff1493", borderRadius: "50%", boxShadow: "0 0 8px #ff1493" },
  logoText: { fontSize: "24px", fontWeight: "900", color: "#ff1493", letterSpacing: "0.5px", fontStyle: "italic" },
  logoBadge: { backgroundColor: "#ffb6c1", color: "#b03060", fontSize: "10px", padding: "3px 6px", borderRadius: "6px", fontWeight: "bold" },
  connectButton: { backgroundColor: "#ff69b4", color: "#ffffff", border: "2px solid transparent", padding: "10px 20px", borderRadius: "20px", fontWeight: "bold", cursor: "pointer" },
  connectedButton: { backgroundColor: "#ffe4e1", color: "#ff1493", border: "1px solid #ffb6c1", padding: "10px 20px", borderRadius: "20px", fontWeight: "bold", cursor: "pointer" },
  navContainer: { display: "flex", gap: "5px", backgroundColor: "#ffe4e1", padding: "6px", borderRadius: "20px", marginTop: "10px", flexWrap: "wrap", justifyContent: "center" },
  activeTab: { padding: "10px 20px", backgroundColor: "#ff1493", borderRadius: "15px", fontWeight: "bold", color: "#ffffff", cursor: "pointer", boxShadow: "0 2px 5px rgba(255, 20, 147, 0.2)", transition: "all 0.3s ease" },
  inactiveTab: { padding: "10px 20px", fontWeight: "bold", color: "#c71585", cursor: "pointer", transition: "all 0.3s ease" },
  mainArea: { flex: 1, display: "flex", justifyContent: "center", alignItems: "flex-start", width: "100%", padding: "20px", boxSizing: "border-box", marginTop: "20px" },
  card: { backgroundColor: "#ffffff", width: "100%", maxWidth: "460px", borderRadius: "24px", padding: "24px", boxShadow: "0 10px 40px rgba(255, 105, 180, 0.2)", border: "1px solid #ffb6c1", transition: "all 0.3s ease", zIndex: 1 },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  cardTitle: { margin: 0, fontSize: "20px", color: "#333", fontWeight: "900" },
  settingsIcon: { cursor: "pointer", fontSize: "20px" },
  inputBox: { backgroundColor: "#fff0f5", borderRadius: "16px", padding: "16px", border: "1px solid #ffe4e1" },
  inputLabel: { color: "#b03060", fontSize: "14px", marginBottom: "10px", fontWeight: "600" },
  inputRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  inputField: { backgroundColor: "transparent", border: "none", color: "#333", fontSize: "32px", outline: "none", width: "60%", fontWeight: "bold" },
  networkName: { fontSize: "18px", fontWeight: "bold", color: "#333" },
  tokenButton: { display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#ffffff", border: "1px solid #ffb6c1", color: "#333", padding: "8px 16px", borderRadius: "20px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", boxShadow: "0 2px 4px rgba(255, 182, 193, 0.1)" },
  tokenIcon: { fontSize: "18px" },
  balanceText: { color: "#c71585", fontSize: "12px", textAlign: "right", marginTop: "8px", fontWeight: "600" },
  arrowContainer: { display: "flex", justifyContent: "center", margin: "-10px 0", position: "relative", zIndex: 1 },
  arrowIcon: { backgroundColor: "#ff1493", color: "#ffffff", width: "36px", height: "36px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "10px", border: "4px solid #ffffff", cursor: "pointer", fontWeight: "bold", fontSize: "18px", boxShadow: "0 2px 8px rgba(255, 20, 147, 0.3)" },
  actionButton: { width: "100%", backgroundColor: "#ff1493", color: "#ffffff", padding: "16px", borderRadius: "16px", fontSize: "18px", fontWeight: "bold", marginTop: "20px", cursor: "pointer", border: "none" },
  
  // GAYA DASHBOARD & STAKING
  statGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "24px" },
  statBox: { backgroundColor: "#fff0f5", padding: "16px", borderRadius: "16px", border: "1px solid #ffb6c1", textAlign: "center", boxShadow: "inset 0 2px 4px rgba(255,255,255,0.5)" },
  statLabel: { color: "#c71585", fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px" },
  statValue: { color: "#ff1493", fontSize: "22px", fontWeight: "900", marginTop: "8px" },
  sectionTitle: { fontSize: "16px", fontWeight: "bold", color: "#333", marginBottom: "12px", marginTop: "24px", borderBottom: "2px solid #ffe4e1", paddingBottom: "8px" },
  assetRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px dashed #ffe4e1" },
  assetInfo: { display: "flex", alignItems: "center", gap: "12px" },
  assetSymbol: { fontWeight: "bold", color: "#333", fontSize: "16px" },
  assetNameMini: { fontSize: "12px", color: "#888" },
  assetBalance: { fontWeight: "900", color: "#ff1493", fontSize: "16px" },
  
  poolCard: { backgroundColor: "#fff0f5", border: "1px solid #ffb6c1", borderRadius: "16px", padding: "16px", marginBottom: "16px", transition: "all 0.3s ease" },
  poolHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" },
  poolIcons: { fontSize: "20px", marginRight: "8px" },
  poolName: { fontWeight: "900", color: "#333", fontSize: "15px" },
  aprBadge: { backgroundColor: "#32cd32", color: "#fff", padding: "4px 8px", borderRadius: "8px", fontSize: "12px", fontWeight: "bold", boxShadow: "0 2px 4px rgba(50, 205, 50, 0.3)" },
  poolDetails: { display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#555", marginBottom: "12px" },
  poolStat: { display: "flex", flexDirection: "column", gap: "4px" },

  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(255, 182, 193, 0.4)", backdropFilter: "blur(4px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
  modalContent: { backgroundColor: "#ffffff", width: "90%", maxWidth: "400px", borderRadius: "24px", padding: "20px", boxShadow: "0 10px 50px rgba(255, 20, 147, 0.3)", border: "1px solid #ffb6c1" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  closeButton: { background: "none", border: "none", fontSize: "20px", fontWeight: "bold", color: "#ff1493", cursor: "pointer" },
  tokenListContainer: { display: "flex", flexDirection: "column", gap: "10px", maxHeight: "300px", overflowY: "auto" },
  tokenListItem: { display: "flex", alignItems: "center", gap: "15px", padding: "12px", borderRadius: "16px", cursor: "pointer", border: "1px solid transparent" }
};

const tokenList = [
  { symbol: "ARC", icon: "⚡", name: "Arc Token" },
  { symbol: "ARROW", icon: "🌸", name: "Arrow Token" },
  { symbol: "DBAY", icon: "💠", name: "Dbay Modern" },
  { symbol: "ETH", icon: "🔵", name: "Ethereum" },
  { symbol: "USDC", icon: "💵", name: "USD Coin" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("Earn");
  const [topToken, setTopToken] = useState(tokenList[0]);
  const [bottomToken, setBottomToken] = useState(tokenList[2]);

  // LOGIKA MESIN DOMPET ASLI (WEB3)
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Fungsi untuk memanggil dompet pengguna
  const handleConnectWallet = async () => {
    // 1. Cek apakah ada mesin Web3 (MetaMask/OKX) di browser
    if (typeof window.ethereum !== "undefined") {
      try {
        setIsConnecting(true);
        // 2. Minta izin ke pengguna untuk menghubungkan akun
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const account = accounts[0];
        
        // 3. Potong teks alamatnya agar rapi (Contoh: 0x123...ABCD)
        const formattedAddress = `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
        setWalletAddress(formattedAddress);
      } catch (error) {
        console.error("Koneksi dibatalkan", error);
        alert("Gagal menghubungkan dompet. Pastikan kamu memberi izin di aplikasimu.");
      } finally {
        setIsConnecting(false);
      }
    } else {
      // Jika dibuka di Chrome biasa yang tidak punya ekstensi Web3
      alert("Dompet Web3 tidak ditemukan! Buka link website ini di dalam browser aplikasi MetaMask, OKX, atau Trust Wallet.");
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectingFor, setSelectingFor] = useState(null);

  const handleFlipTokens = () => {
    setTopToken(bottomToken);
    setBottomToken(topToken);
  };

  const openTokenModal = (side) => {
    setSelectingFor(side);
    setIsModalOpen(true);
  };

  const handleSelectToken = (token) => {
    if (selectingFor === "top") setTopToken(token);
    else setBottomToken(token);
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
        .pool-card:hover { transform: translateY(-3px); box-shadow: 0 8px 15px rgba(255, 105, 180, 0.15); border-color: #ff69b4; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #ffb6c1; border-radius: 10px; }
      `}</style>
      
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.logoContainer}>
            <div style={styles.liveIndicator} className="blinking-dot"></div>
            <span style={styles.logoText}>Arrow</span>
            <span style={styles.logoBadge}>ARC Testnet</span>
          </div>
          <button 
            style={walletAddress ? styles.connectedButton : styles.connectButton} 
            className={walletAddress ? "" : "neon-button"} 
            onClick={handleConnectWallet}
            disabled={isConnecting}
          >
            {isConnecting ? "Connecting..." : (walletAddress ? `🟢 ${walletAddress}` : "Connect Wallet")}
          </button>
        </header>

        <div style={styles.navContainer}>
          <div style={activeTab === "Dashboard" ? styles.activeTab : styles.inactiveTab} onClick={() => setActiveTab("Dashboard")}>Dashboard</div>
          <div style={activeTab === "Swap" ? styles.activeTab : styles.inactiveTab} onClick={() => setActiveTab("Swap")}>Swap</div>
          <div style={activeTab === "Earn" ? styles.activeTab : styles.inactiveTab} onClick={() => setActiveTab("Earn")}>Earn</div>
          <div style={activeTab === "Bridge" ? styles.activeTab : styles.inactiveTab} onClick={() => setActiveTab("Bridge")}>Bridge</div>
        </div>

        <main style={styles.mainArea}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>{activeTab}</h2>
              {activeTab !== "Dashboard" && <span style={styles.settingsIcon}>⚙️</span>}
            </div>

            {/* --- HALAMAN STAKING / EARN --- */}
            {activeTab === "Earn" && (
              <>
                <div style={styles.statGrid}>
                  <div style={styles.statBox}>
                    <div style={styles.statLabel}>Total Staked</div>
                    <div style={styles.statValue}>$1.32M</div>
                  </div>
                  <div style={styles.statBox}>
                    <div style={styles.statLabel}>My Rewards</div>
                    <div style={styles.statValue}>{walletAddress ? "$42.40" : "$0.00"}</div>
                  </div>
                </div>

                <div style={styles.sectionTitle}>Active Yield Pools</div>

                <div style={styles.poolCard} className="pool-card">
                  <div style={styles.poolHeader}>
                    <div><span style={styles.poolIcons}>⚡/🌸</span><span style={styles.poolName}>Stake ARC, Earn ARROW</span></div>
                    <div style={styles.aprBadge}>120% APR</div>
                  </div>
                  <div style={styles.poolDetails}>
                    <div style={styles.poolStat}><span>Your Staked:</span> <span style={{fontWeight: "bold"}}>{walletAddress ? "5,000 ARC" : "0"}</span></div>
                    <div style={styles.poolStat}><span style={{textAlign: "right"}}>Earned:</span> <span style={{color: "#ff1493", fontWeight: "900"}}>{walletAddress ? "142.50 ARROW" : "0"}</span></div>
                  </div>
                  <button style={{...styles.actionButton, padding: "10px", fontSize: "14px", marginTop: "5px"}} className={walletAddress ? "neon-button" : ""} onClick={!walletAddress ? handleConnectWallet : undefined}>
                    {walletAddress ? "Harvest & Stake" : "Connect Wallet"}
                  </button>
                </div>

                <div style={styles.poolCard} className="pool-card">
                  <div style={styles.poolHeader}>
                    <div><span style={styles.poolIcons}>💠/⚡</span><span style={styles.poolName}>Dbay Modern Vault</span></div>
                    <div style={{...styles.aprBadge, backgroundColor: "#ff1493", boxShadow: "0 2px 4px rgba(255, 20, 147, 0.3)"}}>250% APR</div>
                  </div>
                  <div style={styles.poolDetails}>
                    <div style={styles.poolStat}><span>Your Staked:</span> <span style={{fontWeight: "bold"}}>{walletAddress ? "10,000 DBAY" : "0"}</span></div>
                    <div style={styles.poolStat}><span style={{textAlign: "right"}}>Earned:</span> <span style={{color: "#ff1493", fontWeight: "900"}}>{walletAddress ? "3,400 ARC" : "0"}</span></div>
                  </div>
                  <button style={{...styles.actionButton, padding: "10px", fontSize: "14px", marginTop: "5px", backgroundColor: "#333"}} className={walletAddress ? "neon-button" : ""} onClick={!walletAddress ? handleConnectWallet : undefined}>
                    {walletAddress ? "Harvest & Stake" : "Connect Wallet"}
                  </button>
                </div>

                <div style={styles.poolCard} className="pool-card">
                  <div style={styles.poolHeader}>
                    <div><span style={styles.poolIcons}>🌸/🔵</span><span style={styles.poolName}>ARROW-ETH LP Farm</span></div>
                    <div style={{...styles.aprBadge, backgroundColor: "#8a2be2"}}>450% APR</div>
                  </div>
                  <div style={styles.poolDetails}>
                    <div style={styles.poolStat}><span>Your LP Tokens:</span> <span style={{fontWeight: "bold"}}>{walletAddress ? "150 LP" : "0"}</span></div>
                    <div style={styles.poolStat}><span style={{textAlign: "right"}}>Earned:</span> <span style={{color: "#8a2be2", fontWeight: "900"}}>{walletAddress ? "1,250 ARROW" : "0"}</span></div>
                  </div>
                  <button style={{...styles.actionButton, padding: "10px", fontSize: "14px", marginTop: "5px", backgroundColor: "#8a2be2", boxShadow: "0 0 10px rgba(138, 43, 226, 0.5)"}} className={walletAddress ? "neon-button" : ""} onClick={!walletAddress ? handleConnectWallet : undefined}>
                    {walletAddress ? "Stake LP Tokens" : "Connect Wallet"}
                  </button>
                </div>

                <div style={styles.poolCard} className="pool-card">
                  <div style={styles.poolHeader}>
                    <div><span style={styles.poolIcons}>💵/⚡</span><span style={styles.poolName}>Stake USDC, Earn ARC</span></div>
                    <div style={{...styles.aprBadge, backgroundColor: "#20b2aa", boxShadow: "0 2px 4px rgba(32, 178, 170, 0.3)"}}>85% APR</div>
                  </div>
                  <div style={styles.poolDetails}>
                    <div style={styles.poolStat}><span>Your Staked:</span> <span style={{fontWeight: "bold"}}>{walletAddress ? "500 USDC" : "0"}</span></div>
                    <div style={styles.poolStat}><span style={{textAlign: "right"}}>Earned:</span> <span style={{color: "#20b2aa", fontWeight: "900"}}>{walletAddress ? "120 ARC" : "0"}</span></div>
                  </div>
                  <button style={{...styles.actionButton, padding: "10px", fontSize: "14px", marginTop: "5px", backgroundColor: "#20b2aa", boxShadow: "0 0 10px rgba(32, 178, 170, 0.5)"}} className={walletAddress ? "neon-button" : ""} onClick={!walletAddress ? handleConnectWallet : undefined}>
                    {walletAddress ? "Harvest & Stake" : "Connect Wallet"}
                  </button>
                </div>
              </>
            )}

            {/* --- HALAMAN DASHBOARD --- */}
            {activeTab === "Dashboard" && (
              <>
                 <div style={styles.statGrid}>
                  <div style={styles.statBox}>
                    <div style={styles.statLabel}>Platform TVL</div>
                    <div style={styles.statValue}>$1.32M</div>
                  </div>
                  <div style={styles.statBox}>
                    <div style={styles.statLabel}>24h Volume</div>
                    <div style={styles.statValue}>$342K</div>
                  </div>
                </div>

                {!walletAddress ? (
                  <div style={{ textAlign: "center", padding: "40px 0", color: "#888" }}>
                    <div style={{ fontSize: "40px", marginBottom: "10px" }}>🔒</div>
                    <p>Connect your wallet to view your assets.</p>
                  </div>
                ) : (
                  <>
                    <div style={styles.sectionTitle}>Your Assets</div>
                    <div style={styles.assetRow}>
                      <div style={styles.assetInfo}>
                        <span style={{ fontSize: "24px" }}>⚡</span>
                        <div><div style={styles.assetSymbol}>ARC</div><div style={styles.assetNameMini}>Arc Token</div></div>
                      </div>
                      <div style={styles.assetBalance}>15,420.00</div>
                    </div>
                    <div style={styles.assetRow}>
                      <div style={styles.assetInfo}>
                        <span style={{ fontSize: "24px" }}>💠</span>
                        <div><div style={styles.assetSymbol}>DBAY</div><div style={styles.assetNameMini}>Dbay Modern</div></div>
                      </div>
                      <div style={styles.assetBalance}>10,000.00</div>
                    </div>
                    <div style={styles.assetRow}>
                      <div style={styles.assetInfo}>
                        <span style={{ fontSize: "24px" }}>💵</span>
                        <div><div style={styles.assetSymbol}>USDC</div><div style={styles.assetNameMini}>USD Coin</div></div>
                      </div>
                      <div style={styles.assetBalance}>500.00</div>
                    </div>
                  </>
                )}
              </>
            )}

            {/* --- HALAMAN SWAP --- */}
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
                  <div style={styles.balanceText}>Balance: {walletAddress ? "15,420" : "0.00"}</div>
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
                  <div style={styles.balanceText}>Balance: {walletAddress ? "10,000" : "0.00"}</div>
                </div>
                <button style={styles.actionButton} className={walletAddress ? "neon-button" : ""} onClick={!walletAddress ? handleConnectWallet : undefined}>
                  {walletAddress ? "Swap Now" : "Connect Wallet to Swap"}
                </button>
              </>
            )}

            {/* --- HALAMAN BRIDGE --- */}
            {activeTab === "Bridge" && (
              <>
                 <div style={styles.inputBox}>
                  <div style={styles.inputLabel}>From Network</div>
                  <div style={styles.inputRow}><div style={styles.networkName}>🌐 Ethereum Mainnet</div></div>
                </div>
                <div style={styles.arrowContainer}><div style={styles.arrowIcon}>↓</div></div>
                <div style={styles.inputBox}>
                  <div style={styles.inputLabel}>To Network</div>
                  <div style={styles.inputRow}><div style={styles.networkName}>⚡ Arc Testnet</div></div>
                </div>
                <button style={styles.actionButton} className={walletAddress ? "neon-button" : ""} onClick={!walletAddress ? handleConnectWallet : undefined}>
                   {walletAddress ? "Bridge Funds" : "Connect Wallet"}
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
              <h3 style={{ margin: 0, color: "#333", fontWeight: "900" }}>Select a token</h3>
              <button style={styles.closeButton} onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            <div style={styles.tokenListContainer}>
              {tokenList.map((token, index) => (
                <div key={index} style={styles.tokenListItem} className="token-item" onClick={() => handleSelectToken(token)}>
                  <span style={{ fontSize: "28px" }}>{token.icon}</span>
                  <div>
                    <div style={{ fontWeight: "900", color: "#333", fontSize: "16px" }}>{token.symbol}</div>
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
