// @ts-nocheck
import React, { useState, useEffect } from "react";

// TAUTAN LOGO KOIN 
const arcLogo = "/Gradual-Arc-icon-43ee6ca5-45c5-404d-ac1b-f54f93c51f06-1761315436123.png";
const usdcLogo = "https://cryptologos.cc/logos/usd-coin-usdc-logo.png";

// 🔥 MASUKKAN 3 ALAMAT SMART CONTRACT KAMU DI BAWAH INI 🔥
const ARROW_ADDRESS = "0x13F6Fda0A753a46BBE170Afe73B1a0cA829E8798";
const DBAY_ADDRESS = "0xDDf54044035eAE79151026849Ca45f2421c9019a";
const USDC_ADDRESS = "0x4Ef97c897679Edfb807a3Cb60aB726B290ceAFd4";

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
  sectionTitle: { fontSize: "16px", fontWeight: "bold", color: "#333", marginBottom: "12px", marginTop: "10px", borderBottom: "2px solid #ffe4e1", paddingBottom: "8px" },
  assetRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", backgroundColor: "#fff0f5", borderRadius: "12px", border: "1px solid #ff1493", marginBottom: "10px" },
  assetInfo: { display: "flex", alignItems: "center", gap: "12px" },
  assetSymbol: { fontWeight: "bold", color: "#333", fontSize: "16px" },
  assetNameMini: { fontSize: "12px", color: "#888" },
  assetBalance: { fontWeight: "900", color: "#ff1493", fontSize: "20px" },
  faucetButton: { backgroundColor: "#32cd32", color: "#ffffff", border: "none", padding: "8px 12px", borderRadius: "10px", fontWeight: "bold", cursor: "pointer", fontSize: "12px", boxShadow: "0 2px 4px rgba(50, 205, 50, 0.3)", marginLeft: "8px" },
};

export default function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  
  // STATE SALDO ASLI DARI BLOCKCHAIN
  const [balances, setBalances] = useState({ ARC: "0.00", ARROW: "0.00", DBAY: "0.00", USDC: "0.00" });
  const [isClaiming, setIsClaiming] = useState(false);

  // Fungsi Penerjemah Bahasa Blockchain
  const fetchTokenBalance = async (tokenAddress, wallet) => {
    if (!tokenAddress.startsWith("0x")) return "0.00";
    try {
      // 0x70a08231 adalah bahasa mesin untuk mengecek saldo
      const data = "0x70a08231" + "000000000000000000000000" + wallet.substring(2);
      const balanceHex = await window.ethereum.request({
        method: "eth_call",
        params: [{ to: tokenAddress, data: data }, "latest"]
      });
      const rawBalance = parseInt(balanceHex, 16);
      return isNaN(rawBalance) ? "0.00" : (rawBalance / (10 ** 18)).toLocaleString();
    } catch (e) {
      return "0.00";
    }
  };

  const handleConnectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        setIsConnecting(true);
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const account = accounts[0];
        setWalletAddress(`${account.substring(0, 6)}...${account.substring(account.length - 4)}`);

        // 1. Baca Saldo ARC (Native)
        const arcHex = await window.ethereum.request({ method: "eth_getBalance", params: [account, "latest"] });
        const arcBal = (parseInt(arcHex, 16) / (10 ** 18)).toFixed(4);

        // 2. Baca Saldo 3 Token Custom (ARROW, DBAY, USDC)
        const arrowBal = await fetchTokenBalance(ARROW_ADDRESS, account);
        const dbayBal = await fetchTokenBalance(DBAY_ADDRESS, account);
        const usdcBal = await fetchTokenBalance(USDC_ADDRESS, account);

        setBalances({ ARC: arcBal, ARROW: arrowBal, DBAY: dbayBal, USDC: usdcBal });
      } catch (error) {
        console.error(error);
        alert("Koneksi gagal bosku.");
      } finally {
        setIsConnecting(false);
      }
    } else {
      alert("Buka di browser dompet MetaMask/OKX Wallet kamu ya!");
    }
  };

  // FUNGSI EKSEKUSI FAUCET 1.000 USDC
  const handleClaimFaucet = async () => {
    if (!walletAddress) return alert("Connect Wallet dulu bosku!");
    if (!USDC_ADDRESS.startsWith("0x")) return alert("Alamat USDC belum dipasang di kodingan!");
    
    try {
      setIsClaiming(true);
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      
      // 0xbe6d055a adalah sandi rahasia untuk fungsi claimFaucet() di Smart Contract-mu
      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: accounts[0],
          to: USDC_ADDRESS,
          data: "0xbe6d055a"
        }]
      });
      
      alert("Transaksi Faucet sukses meluncur ke Blockchain! Tunggu sekitar 5 detik lalu klik 'Connect Wallet' lagi untuk me-refresh saldo.");
    } catch (error) {
      console.error(error);
      alert("Kamu membatalkan transaksi Faucet.");
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes blinkAnim { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes neonPulse { 0%, 100% { box-shadow: 0 0 10px #ffb6c1, 0 0 20px #ff69b4; border-color: #ff69b4; } 50% { box-shadow: 0 0 20px #ff69b4, 0 0 35px #ff1493; border-color: #ff1493; } }
        .blinking-dot { animation: blinkAnim 1.2s infinite ease-in-out; }
        .neon-button { animation: neonPulse 2s infinite ease-in-out; transition: all 0.3s ease; }
        .neon-button:hover { transform: translateY(-2px); filter: brightness(1.1); }
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
            {isConnecting ? "Menghubungkan..." : (walletAddress ? `🟢 ${walletAddress}` : "Connect Wallet")}
          </button>
        </header>

        <div style={styles.navContainer}>
          <div style={activeTab === "Dashboard" ? styles.activeTab : styles.inactiveTab} onClick={() => setActiveTab("Dashboard")}>Dashboard</div>
          <div style={activeTab === "Swap" ? styles.activeTab : styles.inactiveTab} onClick={() => setActiveTab("Swap")}>Swap</div>
          <div style={activeTab === "Earn" ? styles.activeTab : styles.inactiveTab} onClick={() => setActiveTab("Earn")}>Earn</div>
        </div>

        <main style={styles.mainArea}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>{activeTab}</h2>
            </div>

            {activeTab === "Dashboard" && (
              <>
                {!walletAddress ? (
                  <div style={{ textAlign: "center", padding: "40px 0", color: "#888" }}>
                    <div style={{ fontSize: "40px", marginBottom: "10px" }}>🔒</div>
                    <p>Connect dompetmu untuk melihat saldo <b>Asli</b> dari Blockchain.</p>
                  </div>
                ) : (
                  <>
                    <div style={styles.sectionTitle}>Real-Time Assets</div>
                    
                    {/* BARIS SALDO ARC */}
                    <div style={styles.assetRow}>
                      <div style={styles.assetInfo}>
                        <span style={{ display: "flex", justifyContent: "center", width: "24px" }}><img src={arcLogo} style={{width: "24px", height: "24px"}} alt="ARC"/></span>
                        <div><div style={styles.assetSymbol}>ARC</div><div style={styles.assetNameMini}>Native Token</div></div>
                      </div>
                      <div style={styles.assetBalance}>{balances.ARC}</div>
                    </div>

                    {/* BARIS SALDO DBAY */}
                    <div style={styles.assetRow}>
                      <div style={styles.assetInfo}>
                        <span style={{ fontSize: "24px", display: "flex", justifyContent: "center", width: "24px" }}>💠</span>
                        <div><div style={styles.assetSymbol}>DBAY</div><div style={styles.assetNameMini}>Dbay Modern</div></div>
                      </div>
                      <div style={styles.assetBalance}>{balances.DBAY}</div>
                    </div>

                    {/* BARIS SALDO ARROW */}
                    <div style={styles.assetRow}>
                      <div style={styles.assetInfo}>
                        <span style={{ fontSize: "24px", display: "flex", justifyContent: "center", width: "24px" }}>🌸</span>
                        <div><div style={styles.assetSymbol}>ARROW</div><div style={styles.assetNameMini}>Arrow Token</div></div>
                      </div>
                      <div style={styles.assetBalance}>{balances.ARROW}</div>
                    </div>

                    {/* BARIS SALDO USDC + TOMBOL FAUCET */}
                    <div style={{...styles.assetRow, borderColor: "#32cd32"}}>
                      <div style={styles.assetInfo}>
                        <span style={{ display: "flex", justifyContent: "center", width: "24px" }}><img src={usdcLogo} style={{width: "24px", height: "24px"}} alt="USDC"/></span>
                        <div><div style={styles.assetSymbol}>USDC</div><div style={styles.assetNameMini}>Testnet USD</div></div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={styles.assetBalance}>{balances.USDC}</div>
                        <button style={styles.faucetButton} onClick={handleClaimFaucet} disabled={isClaiming}>
                          {isClaiming ? "⏳..." : "+ Claim"}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {activeTab === "Swap" && (
               <div style={{ textAlign: "center", padding: "40px 0", color: "#888" }}>Fitur Swap sedang antre untuk dihubungkan ke Smart Contract...</div>
            )}
             {activeTab === "Earn" && (
               <div style={{ textAlign: "center", padding: "40px 0", color: "#888" }}>Fitur Staking sedang antre untuk dihubungkan ke Smart Contract...</div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
