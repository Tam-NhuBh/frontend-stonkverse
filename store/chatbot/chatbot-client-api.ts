export const chatbotApi = async (userMessage: string) => {
    const API_URL = "https://backend-stonkverse.vercel.app/api/v1/chat/ask";
  
    try {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Connection": "keep-alive"
            },
            body: JSON.stringify({
                newMessage: userMessage ,
            })
        };
  
        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();
        const botResponse = data.output.trim();
  
        return botResponse;
    } catch (error) {
        console.error("Error fetching response from OpenAI:", error);
        return "Oops! Something went wrong. Please try again.";
    }
  };