import { v4 as uuidv4 } from "uuid";
let fs = require('fs');

class Organization {
    constructor(id, {
        orgName,
        orgAddress,
        phone,
        email
    }){
        this.id = id;
        this.orgName = orgName;
        this.orgAddress = orgAddress;
        this.phone = phone;
        this.email = email;
    }
}

 try {
     const jsonString = fs.readFileSync("data.json", "utf-8");
     console.log(jsonString);
     console.log("dfhdhfd");
     var orgholder = JSON.parse(jsonString);
 } catch (err) {
     var orgholder = {};
     console.log(err);
 }
//var orgholder = {};

const resolvers = {
    getOrganization: ({ id }) => {
         if(!orgholder[id])
            throw new Error("Id doesn't exist!")

        return new Organization(id, orgholder[id])
    },
    getOrganizations: () => {
        let org = []
        Object.keys(orgholder).forEach(key => {
            org.push(new Organization(key, orgholder[key]))
        })

        return org
    },
    createOrganization: ({ input }) => {
        let id = uuidv4()
        orgholder[id] = input
        let jsonString = JSON.stringify(orgholder)
        console.log("jsonString", jsonString)
        fs.writeFile("data.json", JSON.stringify(orgholder), error => {
            if(error) throw error
            else console.log("org added!");
        })
       // fs.writeFile("data.json",JSON.stringify(orgholder, () => {}))
        //console.log(input)
       // console.log(orgholder)
        return new Organization(id, input)
    },
    updateOrg: ({ id, input }) => {
        if(!orgholder[id]) 
            throw new Error("Id doesn't exist!")
            
        orgholder[id] = input

        fs.writeFile("data.json", JSON.stringify(orgholder), error => {
            if(error) throw error
            else console.log("Organization updated!");
        })

        return new Organization(id, input)
    },
    deleteOrg: ({ id }) => {
        if(!orgholder[id]) 
            throw new Error("Id doesn't exist!")

        let new_orgholder = {}, temp
        Object.keys(orgholder).forEach(key => {
            if(key != id) 
                new_orgholder[key] = orgholder[key]
            else
                temp = orgholder[id]
        })

        orgholder = new_orgholder

        fs.writeFile("data.json", JSON.stringify(orgholder), error => {
            if(error) throw error
            else console.log("Organization deleted!");
        })

        return new Organization(id, temp)
    }


}

export default resolvers;