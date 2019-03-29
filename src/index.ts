// External Dependencies.
import * as fs from 'fs'
import * as Handlebars from 'handlebars'
import * as core from 'club-hub-core'

// Drivers Club Specific Emails.
import * as CarClub from './clubs/dc-otto/mailer/index'
export { CarClub }

// Transform 
import * as transform from './transform/transform'

// Models
import { RichContent } from './models/rich'
import { ConfirmationInfo } from './models/confirmation'
import { EventInfo } from './models/event';

/**
 * Compiles a new event email.
 * @param event The ClubHub event for the email. 
 * @param club The ClubHub club to which the email is associated.
 */
export const CompileGenericEmail = (content: string, club: core.Club.Model): Promise<string> => {
    // Transform our event Info
    const eventInfo: RichContent = transform.BuildGenericContent(content, club)

    // Compile the template and return the promise.
    const path: string = `${__dirname}/templates/generic.html`
    return CompileEmail(path, eventInfo)
}

/**
 * Compiles a new event email.
 * @param event The ClubHub event for the email. 
 * @param club The ClubHub club to which the email is associated.
 * @param link The ClubHub club to which the email is associated.
 */
export const CompileEventEmail = (event: core.Event.Model, club: core.Club.Model, link: string): Promise<string> => {
    // Transform our event Info
    const eventInfo: EventInfo = transform.BuildEventContent(event, club, link)
    
    // Compile the template and return the promise.
    const path: string = `${__dirname}/templates/event.html`
    return CompileEmail(path, eventInfo)
}

/**
 * Compiles a new event email.
 * @param event The ClubHub post for the email. 
 * @param club The ClubHub club to which the email is associated.
 */
export const CompilePostEmail = (post: core.Post.Model, club: core.Club.Model, link: string): Promise<string> => {
    // Transform our post Info
    const postInfo: RichContent = transform.BuildPostContent(post, club, link)

    // Compile the template and return the promise.
    const path: string = `${__dirname}/templates/post.html`
    return CompileEmail(path, postInfo)
}

/**
 * Compiles a new event email.
 * @param event The ClubHub event for the email. 
 * @param club The ClubHub club to which the email is associated.
 */
export const CompileConfirmationEmail = (reservation: core.Event.Reservation, event: core.Event.Model, group: core.Calendar.Group, club: core.Club.Model): Promise<string> => {
    // Transform our event Info
    const confirmationInfo: ConfirmationInfo = transform.BuildConfirmationContent(reservation, event, group, club)
    
    // Compile the template and return the promise.
    const path: string = `${__dirname}/templates/confirmation.html`
    return CompileEmail(path, confirmationInfo)
}

/**
 * Compiles an email at the supplied path with the supplied data. 
 * @param path The path of the email template. 
 * @param data The data to compile.
 */
const CompileEmail = (path: string, info: any): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        fs.readFile(path, {encoding: 'utf8'}, (err: NodeJS.ErrnoException, data: string) => {
            if (err) {
                return reject(err)
			}
			try {
                console.log("Data", data)
                const template = Handlebars.compile(data);
                console.log("Template", template)
				resolve(template(info))
			} catch (e) {
				reject(e)
			}
        })    
    });
}
