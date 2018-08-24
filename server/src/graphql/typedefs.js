

export default `
    type Game {
	    name:String
	    description:String
	    imageURI:String
	    services:[Service]
	}
	type Review {
	    user:User!
	    rating:Int
	    description:String
	}
	type Service {
	    name:String
	    imagePath:String
	    description:String
	    user:User!
	    game:Game!
	    serviceType:String
	    reviews:[Review]
	}
	type KnownLocation {
	    lng:String
	    lat:String
	    date:String
	}
	type KnownIp {
	    ipv4:String
	    ipv6:String
	    date:String
	}

    type Message{
        thing:String
    }

	type User {
	    username:String
	    email:String
	    lastLogin:String
	    signUpDate:String
	    emailVerifiedDate:String
	    voiceVerifiedDate:String
	    smsVerifiedDate:String
	    addressVerifiedDate:String
	    driversLicenceVerifiedDate:String
	    passwordLastModifiedDate:String
	    locationShared:Boolean
	    knownLocations:[KnownLocation]
	    lastLoginIP4:String
	    lastLoginIP6:String
	    knownIps:[KnownIp]
	    addressLineOne:String
	    addressLineTwo:String
	    postalCode:Int
	    city:String
	    state:String
	    agreeToTOS:Boolean
	    credits:Int
	    voiceVerified:Boolean
	    smsVerified:Boolean
	    emailVerified:Boolean
	    driversLicenseVerified:Boolean
	    addressVerified:Boolean
	    twitterId:Int
	    facebookId:Int
	    googleId:Int
	    services:[Service]
	    messages:[Message]
	}

    type Mutation{
        users:UserMutations
    }

    type Query{
        users:UserQueries
        reviews:ReviewQueries
        games:GameQueries
    }

    type UserQueries{
        getUsers:[User]
    }

    type ReviewQueries{
        getReviews:[Review]
    }

    type GameQueries{
        getGames:[Game]
    }

    type UserMutations{
        login:String,
        createUser:User
    }

    schema {
        query: Query
        mutation: Mutation
    }
`
;
