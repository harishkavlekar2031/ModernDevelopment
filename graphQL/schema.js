import { buildSchema } from "graphql";

const schema = buildSchema(`
    type Organization {
        id: ID
        orgName: String
        orgAddress: String
        phone: Int
        email: String
    }



    type Query {
        getOrganization(id: ID): Organization
        getOrganizations: [Organization]

    }
    input OrganizationInput {
        id: ID
        orgName: String!
        orgAddress: String
        phone: Int!
        email: String
    }
     input OrganizationUpdate {
        orgName: String
        orgAddress: String
        phone: Int
        email: String
    }


    type Mutation {
        createOrganization(input: OrganizationInput): Organization
        updateOrg(id: ID!, input: OrganizationUpdate): Organization
        deleteOrg(id: ID): Organization
    
    }
    
`)
export default schema;