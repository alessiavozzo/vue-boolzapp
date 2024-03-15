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
            myMessage: null,
            contactReply: "",
            searchInput: null,
            appear: false,
            errorMessage: null,
            onlineMessage: null,
            randomNumber: null,
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
            })
        },

        sendMessage() {
            if (this.myMessage.trim().length > 0) {
                this.contactList[this.activeContact].messages.push({
                    date: this.updateMsgTime(),
                    message: this.myMessage,
                    status: 'sent'
                });
                this.myMessage = "";
                setTimeout(this.autoContactReply, 1000);
            }
            else {
                this.errorMessage = "Non puoi inviare un messaggio vuoto";
                setTimeout(() => {
                    this.errorMessage = null;
                }, 1500);
            }
        },

        autoContactReply() {
            this.randomNumber = this.getRandomNumber(0, this.autoReplies.length - 1);
            this.contactReply = this.autoReplies[this.randomNumber];
            this.contactList[this.activeContact].messages.push({
                date: this.updateMsgTime(),
                message: this.contactReply,
                status: 'received'
            });
        },

        getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },

        searchContact() {
            this.contactList.forEach(contact => {
                contact.name.toLowerCase().startsWith(this.searchInput.toLowerCase()) ? contact.visible = true : contact.visible = false;
            }
            );
        },

        dropMenuAppear(singleMessage, msgIndex) {
            this.contactList[this.activeContact].messages.forEach((message, index) => {
                if (message.appear && msgIndex !== index) {
                    delete message.appear;
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
        }
    },

    mounted() {

    }
}).mount('#app')
