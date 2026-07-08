import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,

} from "graphql";


const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        address: { type: GraphQLString },
        role: {type:GraphQLString},
        profileimage : {type:GraphQLString},
    })
})

export default UserType;