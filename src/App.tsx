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
      
