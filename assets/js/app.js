import {contactList} from "./contactList.js"

const DateTime = luxon.DateTime;

const { createApp } = Vue

createApp({
    data() {
        return {
            contactList: contactList,            
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
