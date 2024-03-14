const DateTime = luxon.DateTime;

const { createApp } = Vue

createApp({
    data() {
        return {

            contactList: [
                {
                    name: 'Michele',
                    avatar: './assets/img/avatar_1.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: './assets/img/avatar_2.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                }, {
                    name: 'Samuele',
                    avatar: './assets/img/avatar_3.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: './assets/img/avatar_4.jpg',
                    visible: true, 
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: './assets/img/avatar_5.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                }, {
                    name: 'Claudia',
                    avatar: './assets/img/avatar_6.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico', 
                    avatar: './assets/img/avatar_7.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: './assets/img/avatar_8.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ]

                }
            ],
            
            activeContact: 0,          
            myMessage: null,
            contactReply: "ok",
            searchInput: null,
            appear: false,
            errorMessage: null,
            
        }
    },

    methods:{
        changeActiveChat(index){
            //console.log("Click chat", index);
            this.activeContact = index;            
            //console.log(this.activeContact, index);
        },

        sendMessage(){
            if (this.myMessage.trim().length > 0) {
                this.contactList[this.activeContact].messages.push({
                    date: this.updateMsgTime(),
                    message: this.myMessage,
                    status: 'sent'
                });
                this.myMessage ="";
                setTimeout(this.autoContactReply, 1000);                
            }
            else{
                //console.log("non puoi mandare un msg vuoto");
                this.errorMessage = "Non puoi inviare un messaggio vuoto"
                setTimeout(() => {
                    this.errorMessage = null;
                }, 1500);
            }
        },

        autoContactReply(){
            this.contactList[this.activeContact].messages.push({
                date: this.updateMsgTime(),
                message: this.contactReply,
                status: 'received'
            });            
        },

        searchContact(){
            this.contactList.forEach(contact => {
                if(contact.name.toLowerCase().startsWith(this.searchInput.toLowerCase())){
                    contact.visible = true
                    console.log(contact.visible);
                }
                else{
                    contact.visible = false
                }
            });
        },

        dropMenuAppear(singleMessage){ 
            //console.log(singleMessage); 
            singleMessage.appear = !singleMessage.appear
        },

        deleteMessage(msgIndex){
            //console.log(msgIndex);
            //console.log("delete");
            //console.log(this.contactList[this.activeContact].messages[msgIndex]);
            this.contactList[this.activeContact].messages.splice(msgIndex, 1);
        },

        formatMsgTime(time){
            return DateTime.fromFormat(time, 'dd/MM/yyyy HH:mm:ss').toFormat('HH:mm');
        },

        updateMsgTime(){
            return DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss');
        }
    },


    mounted(){
        //console.log(this.contactList[0].messages[0].message);
        //console.log(this.contactList[0].messages[0].status === "sent");    
        //console.log(this.contactList[this.activeContact].name.includes(this.searchInput));
        //this.lastMessage = this.contactList[this.activeContact].messages.length - 1
        //console.log(this.lastMessage);    
        //console.log(this.contactList[0].messages.length - 1);        
        //console.log(this.contactList[4].messages.length-1);    
       
    }
}).mount('#app')
