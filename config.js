module.exports = {
	port : 4444,
	address: 'localhost',

	database : {
		host : 'localhost',
		user : 'root',
		password : '',
		database : 'uktc_chat'  
	},
    session: {
        secret: "REPLACE ME",
        cookieMaxAge: 21600000
    },
	passwordHashing: {
		saltRounds: 10
	},
	regex: {
        emailValidation: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        usernameValidation: /^[a-zA-Z0-9_-]{3,}$/,
        passwordValidation: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*#?&\^]{6,}$/,
    }
};
