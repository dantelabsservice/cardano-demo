### **Task 1: Integrate a Cardano Wallet Connector**

- **Goal:** Allow users to connect their Cardano wallets (e.g., Nami, Eternl, Flint) to your Ski Trail Manager.
- **Technical Implementation:**
    - Use a library like `@meshsdk/core` or `@cardano-sdk/web-extension` to detect and interact with wallets.
    - Create a "Connect Wallet" button in your Next.js UI.
    - Upon connection, display the user's connected wallet address and network (Mainnet/Preprod Testnet).
- **Deliverable:** A functional "Connect Wallet" feature in your application. **Use the Preprod Testnet for all development.**

---

### **Task 2: Display User's Assets**

- **Goal:** After connecting, show the user's wallet balance in ADA and any Native Tokens (this will be relevant later).
- **Technical Implementation:**
    - Use Mesh or the Cardano-SDK to query the blockchain for the user's UTXOs and asset balances.
    - Display this information cleanly in the UI.
- **Deliverable:** The UI now shows the connected user's balance.

---

### **Task 3: "Check-In" to a Ski Trail with On-Chain Metadata**

- **Goal:** A user can select a trail and "Check-In," creating a permanent, tamper-proof record on the Cardano blockchain.
- **Technical Implementation:**
    - Create a function that builds a transaction.
    - This transaction will send a **minimal amount of ADA (e.g., 2 ADA)** to the user's own address (a "token burn" is more advanced, this is simpler).
    - The critical part: Attach **Transaction Metadata** to this transaction.
    - **Metadata Structure Suggestion:**
        
        ```
        {
          "SkiTrailManager": {
            "trailId": "123",
            "trailName": "Black Diamond Run",
            "checkInTime": "2023-10-27T10:30:00Z",
            "difficulty": "Expert"
          }
        }
        ```
        

• **Deliverable:** A user can check into a trail. They sign the transaction with their wallet, and after it's confirmed, the UI shows a success message with a link to the transaction on a Cardano Explorer (e.g., [Cexplorer.io](https://cexplorer.io/)).

---

### **Task 4: Fetch and Display User's Check-In History**

- **Goal:** Create a "My Check-Ins" page that reads the user's on-chain history.
- **Technical Implementation:**
    - Use Mesh's `fetchAccountAddresses` or the [Blockfrost API](https://blockfrost.io/) to get all transactions for the user's address.
    - Filter these transactions for the ones containing your specific metadata label (`SkiTrailManager`).
    - Parse the metadata and display a list of the user's past check-ins.
- **Deliverable:** A page that dynamically lists the user's check-in history by reading data from the blockchain.

---

### **Task 5: Mint a "Trail Completion Badge" NFT**

- **Goal:** When a user checks into a particularly difficult trail, they automatically receive a unique NFT badge as a reward.
- **Technical Implementation:**
    - This is more advanced and requires understanding of Minting Policies.
    - Write a simple Plutus smart contract (using Aiken or PlutusTx) for the minting policy, or use Mesh's `NativeScript` for a simpler on-chain policy.
    - Modify the "Check-In" transaction from Task 3. Now, in addition to the metadata, it will also **mint and send 1 NFT to the user**.
    - The NFT should have metadata (using CIP-25) that describes the badge (name, image, trail name, etc.).
- **Deliverable:** Checking into a specific trail (e.g., "Extreme Couloir") results in the user receiving a verifiable NFT badge in their wallet, visible in the assets list from Task 2.

---

### **Task 6 (Optional Stretch Goal): Staking & Rewards**

- **Goal:** Create a custom staking mechanism where users can stake their "Trail Completion Badge" NFTs to earn a custom reward token over time.
- **Technical Implementation:**
    - This involves a more complex Plutus smart contract that locks a user's NFT and distributes a fungible token (e.g., "SKI" tokens) based on time staked.
    - You would need a frontend interface to "Stake" and "Unstake" the NFT.
- **Deliverable:** A fully functional staking dApp within your Ski Trail Manager.

---

### **Technology Stack for the Assessment**

- **Frontend:** Your existing Next.js app.
- **Cardano SDK:** [**Mesh JS SDK**](https://meshjs.dev/) is highly recommended for its excellent React/Next.js support and comprehensive tools.
- **Backend (Optional but Recommended for some tasks):** You can add API routes inside your Next.js app (`/pages/api` or `/app/api` in the App Router) to handle secure operations like querying Blockfrost or building complex transactions.
- **Blockchain Data:** [**Blockfrost**](https://blockfrost.io/) API (get a free project ID for the testnet) for easily querying blockchain data.
- **Smart Contracts:** **Aiken** or **PlutusTx**. Mesh provides tools to work with both.
- **Network:** **Cardano Preprod Testnet.**