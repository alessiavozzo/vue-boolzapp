import { contactList } from "./contactList.js"
import { autoReplies } from "./autoreplies.js"

const DateTime = luxon.DateTime;

const { createApp } = Vue

createApp({
    data() {
        return {

            autoReplies: autoReplies,
            contactList: contactList,
            activeContact: 0,
            myMessage: "",
            contactReply: "",
            searchInput: null,
            appear: false,
            errorMessage: null,
            randomNumber: null,
            typingMsg: false,
            isTypingStatus: false,
            onlineStatus: false,
            clickContact: false,
            contactVisibility: false,
            endWhile: false,
        }
    },

    methods: {
        changeActiveChat(contact, index) {
            this.activeContact = index;
            //elimina i menu a tendina che ci sono aperti al cambio chat
            contact.messages.forEach(message => {
                if (message.appear) {
                    delete message.appear;
                }
                if (this.appear) {
                    this.appear = false;
                }
            })
            this.clickContact = true;
        },

        sendMessage() {
            if (this.myMessage.trim().length > 0) {
                this.contactList[this.activeContact].messages.push({
                    date: this.updateMsgTime(),
                    message: this.myMessage,
                    status: 'sent'
                });
                this.myMessage = "";
                this.changeTypingStatus()
                setTimeout(this.autoContactReply, 1000);
            }
            else {
                this.errorMessage = "Non puoi inviare un messaggio vuoto";
                setTimeout(() => {
                    this.errorMessage = null;
                }, 1500);
            }
            this.typingMessage()
        },

        autoContactReply() {
            this.randomNumber = this.getRandomNumber(0, this.autoReplies.length - 1);
            this.contactReply = this.autoReplies[this.randomNumber];
            this.contactList[this.activeContact].messages.push({
                date: this.updateMsgTime(),
                message: this.contactReply,
                status: 'received'
            });
            this.changeOnlineStatus()
        },

        changeTypingStatus() {
            this.onlineStatus = false;
            //setta su true il v-if di "sta scrivendo"
            this.isTypingStatus = true;
        },

        changeOnlineStatus() {
            //setta su true il v-else-if di "online" e spegne il v-if di "sta scrivendo"
            this.onlineStatus = true;
            this.isTypingStatus = false;
            //spegne "online" dopo 2 secondi
            setTimeout(() => {
                this.onlineStatus = false;
            }, 2000);
        },

        getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },

        searchContact() {
            this.contactVisibility = false
            this.contactList.forEach(contact => {
                contact.name.toLowerCase().startsWith(this.searchInput.toLowerCase()) ? contact.visible = true : contact.visible = false;
                //se uno dei contatti è mostrato allora contactVisibility = true, se non trova corrispondenze contactVisibility è false
                if (contact.visible === true) {
                    this.contactVisibility = true;
                }
                //devo risettare contactVisibility false perchè fa il controllo a ogni lettera                    
            }
            );
        },

        upperCaseName(word) {
            if (word !== null) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }
        },

        startNewChat() {
            this.contactList.unshift(
                {
                    name: this.searchInput,
                    avatar: './assets/img/avatar_8.jpg',
                    visible: true,
                    messages: []
                }
            )
            this.searchInput = "";
            this.searchContact()
        },

        dropMenuAppear(singleMessage, msgIndex) {
            this.contactList[this.activeContact].messages.forEach((message, index) => {
                if (message.appear && msgIndex !== index) {
                    delete message.appear;
                }
                if (this.appear) {
                    this.appear = false;
                }
            })
            singleMessage.appear = !singleMessage.appear;
        },

        deleteMessage(msgIndex) {
            this.contactList[this.activeContact].messages.splice(msgIndex, 1);
        },

        formatMsgTime(time) {
            return DateTime.fromFormat(time, 'dd/MM/yyyy HH:mm:ss').toFormat('HH:mm');
        },

        updateMsgTime() {
            return DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss');
        },

        typingMessage() {
            this.myMessage !== "" ? this.typingMsg = true : this.typingMsg = false;
        },

        dropDeleteMenuAppear() {
            this.contactList[this.activeContact].messages.forEach(message => {
                if (message.appear) {
                    delete message.appear;
                }
            })
            this.appear = !this.appear;
        },

        deleteAllMessages() {
            this.contactList[this.activeContact].messages.splice(0, this.contactList[this.activeContact].messages.length)
            this.appear = false;
        },

        deleteChat() {
            this.contactList.splice([this.activeContact], 1)
            this.appear = false;
        }


    },

    mounted() {
        //console.log(this.contactList[this.activeContact].messages.length);
        //console.log(this.contactList[this.activeContact]);
        //console.log(this.contactList[this.activeContact]);
    }
}).mount('#boolzApp')
