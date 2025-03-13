require('dotenv').config();
const OpenAI = require("openai");

const openAi = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function fetchBOBInterestRates() {

    return `
    Interest Rates of Bank of Baroda:
    - Savings Account: 3.5% p.a.
    - Fixed Deposit: 6.0% p.a.
    - Recurring Deposit: 5.5% p.a.
    `;
  }
  

  async function fetchBOBSchemes() {
    return `
    Bank of Baroda offers a wide range of products and services to cater to different needs:
  
    1. Deposit Schemes:
       - Savings Account: Different types such as Baroda Basic Savings Account, Baroda Salary Advantage Savings Account, etc.
       - Current Account: Tailored for businesses with features like Baroda Premium Current Account, Baroda Startup Current Account, etc.
       - Fixed Deposit (FD): Various options like Baroda Advantage Fixed Deposit, Baroda Double Dhamaka Fixed Deposit Scheme, etc.
       - Recurring Deposit (RD): Regular saving plans with Baroda Recurring Deposit.
  
    2. Loan Schemes:
       - Home Loans: Baroda Home Loan, Baroda Pre-Approved Home Loan, Baroda Top-Up Loan, etc.
       - Personal Loans: Baroda Personal Loan, Baroda Loan Against Property, Baroda Mortgage Loan, etc.
       - Auto Loans: Baroda Car Loan, Baroda Two Wheeler Loan, etc.
       - Education Loans: Baroda Gyan, Baroda Vidya, Baroda Scholar, etc.
       - Agricultural Loans: Baroda Kisan Credit Card, Baroda Kisan Tatkal Loan, etc.
       - MSME Loans: Baroda MSME Loan, Baroda Mudra Loan, etc.
  
    3. Investment Services:
       - Mutual Funds: Investment options through Baroda Mutual Fund.
       - Insurance: Life and general insurance products in partnership with different insurance companies.
       - Demat Services: Facilities for trading and holding securities in electronic form.
  
    4. Digital Banking:
       - Internet Banking: Baroda Connect for various banking transactions online.
       - Mobile Banking: Mobile applications like Baroda M-Connect+, BHIM Baroda Pay, Baroda M-Passbook.
       - UPI Services: Unified Payment Interface services for easy fund transfer.
       - ATM/Debit Cards: Various card services like Baroda MasterCard, Baroda RuPay Debit Card.
  
    5. NRI Banking:
       - Accounts: NRE, NRO, and FCNR accounts.
       - Remittances: Swift and fast money transfer services.
       - Investments: Portfolio investment schemes and NRI demat services.
  
    6. Corporate Banking:
       - Working Capital Finance: Cash credit, overdrafts, and loans.
       - Term Loans: For asset acquisition and long-term projects.
       - Trade Finance: Letter of credit, bank guarantees, and import/export financing.
       - Project Finance: Funding for large-scale projects.
  
    7. Agricultural and Rural Banking:
       - Kisan Credit Card (KCC): Short-term credit to farmers.
       - Rural Development Loans: Loans for rural housing, agriculture, and allied activities.
  
    8. Financial Inclusion:
       - Basic Savings Bank Deposit Account (BSBDA): No minimum balance requirement accounts.
       - Pradhan Mantri Jan-Dhan Yojana (PMJDY): Financial services to the unbanked sector.
  
    9. Government Schemes:
       - Atal Pension Yojana (APY)
       - Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)
       - Pradhan Mantri Suraksha Bima Yojana (PMSBY)
       - Sukanya Samriddhi Yojana
  
    10. Other Services:
        - Locker Facility: Safe deposit lockers of various sizes.
        - Forex Services: Foreign exchange and remittance services.
        - Merchant Banking: Advisory services for capital market activities.
        - E-Services: E-Tax, E-Trade, E-Merchant Acquiring Services.
    `;
  }
  
  exports.getFinancialAdvice = async (req, res) => {
    const {
      customer_id, credit_score, country, gender, age,
      tenure, balance, products_number, credit_card,
      active_member, estimated_salary, churn
    } = req.body;
  
  
    const interestRates = await fetchBOBInterestRates();
    const schemes = await fetchBOBSchemes();
  
    const prompt = `
    Customer Information:
    - Customer ID: ${customer_id}
    - Credit Score: ${credit_score}
    - Country: ${country}
    - Gender: ${gender}
    - Age: ${age}
    - Tenure: ${tenure}
    - Balance: ${balance}
    - Number of Products: ${products_number}
    - Credit Card: ${credit_card}
    - Active Member: ${active_member}
    - Estimated Salary: ${estimated_salary}
    - Churn: ${churn}
  
    Based on the above customer information, think yourself as an Expert Bank Executive provide the following recommendations:
    1. Suggested Financial Instruments:
    2. Credit Improvement Programs:
    3. Savings Plans:
    4. Investment Options:
    5. Budgeting Tools:
    6. Educational Loans:
  
    Additional Information:
    ${interestRates}
  
    ${schemes} 
    Based on these create educational content and make a customised email
    `;
  
    try {
      const completion = await openAi.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      });
      const modelResponse = completion.choices[0].message.content;
      res.json({ recommendations: modelResponse });
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      res.status(500).json({ error: 'Error fetching recommendations' });
    }
  };
