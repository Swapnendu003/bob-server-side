require('dotenv').config();
const { ChatAnthropic } = require('@langchain/anthropic')

const {ChatFireworks }= require('@langchain/community/chat_models/fireworks')
const model = new ChatFireworks({
apiKey: process.env.FIREWORKS_API_KEY,
model: "accounts/fireworks/models/llama-v3-70b-instruct",
    max_tokens: 1024,
    top_p: 1,
    top_k: 40,
    presence_penalty: 0,
    frequency_penalty: 0,
    temperature: 0.6,
});

/*const model = new ChatAnthropic({
  temperature: 0.9,
  model: "claude-3-5-sonnet-20240620",
  apiKey: process.env.ANTHROPIC_API_KEY,
  maxTokens: 1024,
});*/

exports.getFinancialAdvice = async (req, res) => {
  const {
    customer_id, credit_score, country, gender, age,
    tenure, balance, products_number, credit_card,
    active_member, estimated_salary, churn
  } = req.body;

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

  Based on the above customer information, provide the following recommendations:
  1. Suggested Financial Instruments:
  2. Credit Improvement Programs:
  3. Savings Plans:
  4. Investment Options:
  5. Budgeting Tools:
  6. Educational Loans:
  `;

  try {
    const modelResponse = await model.invoke(prompt);
    res.json({ recommendations: modelResponse });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ error: 'Error fetching recommendations' });
  }
};
