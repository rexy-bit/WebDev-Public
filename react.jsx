        function ChatInput({chatMessages, setChatMessages}){

            const [inputText, setInputText] = React.useState('');
            const [isLoading, setIsLoading] = React.useState(false);

            function saveInputText(event){
                setInputText(event.target.value);
            }

            async function sendMessage(){

                if(inputText === '' || isLoading){
                    return;
                }

                setIsLoading(true);

                const newChatMessages = [
                    ...chatMessages,
                    {
                        message : inputText,
                        sender : "user",
                        id : crypto.randomUUID()
                    }
                ];

                setChatMessages(newChatMessages);

                setInputText('');

                setChatMessages([
                    ...newChatMessages,
                    {
                        message : 'Loading...',
                        sender : 'robot',
                        id : crypto.randomUUID()
                    }
                ]);

                const response = await Chatbot.getResponseAsync(inputText);

                setChatMessages([
                    ...newChatMessages,
                    {
                        message : response,
                        sender : 'robot',
                        id : crypto.randomUUID()
                    }
                ]);
             }

             function handleKeyDown(event){

                if(event.key === "Enter"){
                    sendMessage();
                }else if(event.key === "Escape"){
                    setInputText('');
                }
             }

             setIsLoading(false);

             return (
                <>
                   
                  <div  className="inputs">
                       <input 
                         type="text"
                         placeholder="Enter message"
                         onChange={saveInputText}
                         value={inputText}
                         onKeyDown={handleKeyDown}
                         className="input-msg"
                       />  

                       <button 
                       onClick={sendMessage}
                       className="send-button"
                       >send</button>
                  </div>
                </>
             );
        }

        function ChatMessage({message, sender}){
            

            return (
               <>
                   <div className="chat-message">
                   {sender === "robot" && (
                    <img src="robot.png" width="50"/>
                   )}
                      {message}
                
                    {sender === "user" && (
                        <img src="user.png" width="50"/>
                    )}
                   </div>
                   
               </>
            );
        }

         function ChatMessages({chatMessages}){
             
            return(
                <>

                <div className="chat-messages">
                  {chatMessages.map((chatMessage)=>{
                    
                      return(
                        
                          <ChatMessage
                           message={chatMessage.message}
                           sender={chatMessage.sender}
                           key={chatMessage.id}
                        />
                        
                      );

                  })}

                  </div>
                </>
            )
         }


        function App(){

           const [chatMessages, setChatMessages] = React.useState(
            [
                    {
                        message : 'Hello World',
                        sender : 'user',
                        id : 'id1'
                    },{
                        message : 'Hello! How can I help you?',
                        sender : 'robot',
                        id : 'id2'
                    },{
                        message : 'can you get me todays date?',
                        sender : 'user',
                        id : 'id3'
                    },{
                        message : "Today is september 27",
                        sender : 'robot',
                        id : 'id4'
                    }
                ]
           );


           return(
            <>

              <h1>React Application Chatbot</h1>

              <div class="functionalities">
                 <p>- Tell date</p>
                 <p>- Roll a dice</p>
                 <p>- Flip a coin</p>
                </div>



              <ChatMessages 
                   chatMessages={chatMessages}
                  
              />
                            <ChatInput
                 chatMessages={chatMessages}
                 setChatMessages={setChatMessages}
              />
            </>
           )

        }

         const container = document.querySelector(".js-container");
         ReactDOM.createRoot(container).render(<App />);