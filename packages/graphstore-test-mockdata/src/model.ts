/* **********************************************************
 *               SYSTEM GENERATED FILE: DO NOT EDIT     
 * This file was system generated by firebase-schema-generator 
 * on Sat, 10 Nov 2018 18:12:23 GMT 
 * *********************************************************** */


import { Model, Submodel, Status, Store, primary, foreign, resolver, jsonfield, observable } from '@besync/graphstore';
export { toJS, push, IEnhancedObservableArray } from '@besync/graphstore';

export interface Time extends Date {};
export type int = number;

/* **************************
 * STORES
 * ************************** */
    
export class AnalyticsStore extends Store {
    static getbyId(user_id): Analytics { return Analytics.getDocument({user_id}, `analytics/users/${user_id}`);}
    static getAnalyticsForUser(user_id): Analytics { return Analytics.getDocument({user_id}, `analytics/users/${user_id}`);}
    static path({user_id}): string { return `analytics/users/${user_id}` }
}

export class AwesomeLinkStore extends Store {
    static getbyId(user_id,  id): AwesomeLink { return AwesomeLink.getDocument({user_id,  id}, `awesomeLinks/${user_id}/${id}`);}
    static getAwesomeLinksForUser(user_id): AwesomeLink[] { return AwesomeLink.getCollection({user_id}, `awesomeLinks/${user_id}`);}
    static path({user_id,  id}): string { return `awesomeLinks/${user_id}/${id}` }
}

export class GraphStateStore extends Store {
    static getbyId(user_id,  id): GraphState { return GraphState.getDocument({user_id,  id}, `graphState/${user_id}/${id}`);}
    static getGraphStateForUser(user_id): GraphState[] { return GraphState.getCollection({user_id}, `graphState/${user_id}`);}
    static path({user_id,  id}): string { return `graphState/${user_id}/${id}` }
}

export class ChatStore extends Store {
    static getbyId(from_user_id,  to_user_id,  id): Chat { return Chat.getDocument({from_user_id,  to_user_id,  id}, `chats/${from_user_id}/${to_user_id}/${id}`);}
    static getChatsForUser(from_user_id): Chat[] { return Chat.getCollection({from_user_id}, `chats/${from_user_id}`);}
    static getChatsForUserUser(from_user_id,  to_user_id): Chat[] { return Chat.getCollection({from_user_id,  to_user_id}, `chats/${from_user_id}/${to_user_id}`);}
    static path({from_user_id,  to_user_id,  id}): string { return `chats/${from_user_id}/${to_user_id}/${id}` }
}

export class LogStore extends Store {
    static getbyId(user_id,  id): Log { return Log.getDocument({user_id,  id}, `logs/${user_id}/${id}`);}
    static getLogsForUser(user_id): Log[] { return Log.getCollection({user_id}, `logs/${user_id}`);}
    static path({user_id,  id}): string { return `logs/${user_id}/${id}` }
}

export class PostStore extends Store {
    static getbyId(id): Post { return Post.getDocument({id}, `posts/${id}`);}
    static getAll(): Post[] { return Post.getCollection({}, `posts`);}
    static path({id}): string { return `posts/${id}` }
}

export class UserPostStore extends Store {
    static getbyId(user_id,  id): UserPost { return UserPost.getDocument({user_id,  id}, `userPosts/${user_id}/${id}`);}
    static getUserPostsForUser(user_id): UserPost[] { return UserPost.getCollection({user_id}, `userPosts/${user_id}`);}
    static path({user_id,  id}): string { return `userPosts/${user_id}/${id}` }
}

export class UserStore extends Store {
    static getbyId(id): User { return User.getDocument({id}, `users/${id}`);}
    static path({id}): string { return `users/${id}` }
}

export class OrgStore extends Store {
    static getbyId(id): Org { return Org.getDocument({id}, `orgs/${id}`);}
    static getAll(): Org[] { return Org.getCollection({}, `orgs`);}
    static path({id}): string { return `orgs/${id}` }
}

export class OrgUserStore extends Store {
    static getbyId(org_id,  user_id,  role_id): OrgUser { return OrgUser.getDocument({org_id,  user_id,  role_id}, `orgUsers/${org_id}/${user_id}/${role_id}`);}
    static getOrgUsersForOrg(org_id): OrgUser[] { return OrgUser.getCollection({org_id}, `orgUsers/${org_id}`);}
    static getOrgUsersForOrgUser(org_id,  user_id): OrgUser[] { return OrgUser.getCollection({org_id,  user_id}, `orgUsers/${org_id}/${user_id}`);}
    static path({org_id,  user_id,  role_id}): string { return `orgUsers/${org_id}/${user_id}/${role_id}` }
}

/* **************************
* ROOT MODELS
* ************************** */

export class Post extends Model 
{

    @primary @observable id: string;
    @observable body: string;
    @observable starCount: int;
    @observable @jsonfield stars: Post_Star[];
    @observable title: string;
    @observable uid: User;

    protected static Store: typeof Store = PostStore;

    constructor (defaults: {id: string, [extra: string]: any }, ...args) { super(defaults, ...args); } 

}

export class Post_Star extends Submodel
{
    @observable id: User;
    @observable item_value: boolean;
}

export class User extends Model 
{

    @primary @observable id: string;
    @observable email: string;
    @observable profile_picture: string;
    @observable username: string;
    @resolver get analytics(): Analytics { return AnalyticsStore.getAnalyticsForUser(this.id); };
    @resolver get awesomeLinks(): AwesomeLink[] { return AwesomeLinkStore.getAwesomeLinksForUser(this.id); };
    @resolver get graphStates(): GraphState[] { return GraphStateStore.getGraphStateForUser(this.id); };
    @resolver get chats(): Chat[] { return ChatStore.getChatsForUser(this.id); };
    @resolver get logs(): Log[] { return LogStore.getLogsForUser(this.id); };
    @resolver get userPosts(): UserPost[] { return UserPostStore.getUserPostsForUser(this.id); };

    protected static Store: typeof Store = UserStore;

    constructor (defaults: {id: string, [extra: string]: any }, ...args) { super(defaults, ...args); } 

}

export class Org extends Model 
{

    @primary @observable id: string;
    @observable name: string;
    @observable parent: string;
    @observable @jsonfield roles: Org_Role[];
    @observable @jsonfield search: Org_Search;
    @resolver get orgUsers(): OrgUser[] { return OrgUserStore.getOrgUsersForOrg(this.id); };

    protected static Store: typeof Store = OrgStore;

    constructor (defaults: {id: string, [extra: string]: any }, ...args) { super(defaults, ...args); } 

}

export class Org_Role extends Submodel
{
    @observable id: EnumConfigRole;
    @observable item_value: boolean;
}

export class Org_Search extends Submodel
{
    @observable name?: string;
}


/* **************************
 * USER-BASED MODELS
 * ************************** */
    
export class Analytics extends Model 
{
    @resolver get user(): User { return UserStore.getbyId(this.user_id) }; 

    @primary @observable @foreign user_id: string;
    @observable lastOpened: Date;

    protected static Store: typeof Store = AnalyticsStore;

    constructor (defaults: {user_id: string, [extra: string]: any }, ...args) { super(defaults, ...args); } 

}

export class AwesomeLink extends Model 
{
    @resolver get user(): User { return UserStore.getbyId(this.user_id) }; 

    @primary @observable @foreign user_id: string;
    @primary @observable id: string;
    @observable created: Time;
    @observable lastViewed: Date;
    @observable link: string;
    @observable name: string;
    @observable type: string;

    protected static Store: typeof Store = AwesomeLinkStore;

    constructor (defaults: {user_id: string, id: string, [extra: string]: any }, ...args) { super(defaults, ...args); } 

}

export class GraphState extends Model 
{
    @resolver get user(): User { return UserStore.getbyId(this.user_id) }; 

    @primary @observable @foreign user_id: string;
    @primary @observable id: string;
    @observable encData: string;

    protected static Store: typeof Store = GraphStateStore;

    constructor (defaults: {user_id: string, id: string, [extra: string]: any }, ...args) { super(defaults, ...args); } 

}

export class Chat extends Model 
{
    @resolver get from_user(): User { return UserStore.getbyId(this.from_user_id) }; 
    @resolver get to_user(): User { return UserStore.getbyId(this.to_user_id) }; 

    @primary @observable @foreign from_user_id: string;
    @primary @observable @foreign to_user_id: string;
    @primary @observable id: string;
    @observable encData: string;
    @observable signature?: string;

    protected static Store: typeof Store = ChatStore;

    constructor (defaults: {from_user_id: string, to_user_id: string, id: string, [extra: string]: any }, ...args) { super(defaults, ...args); } 

}

export class Log extends Model 
{
    @resolver get user(): User { return UserStore.getbyId(this.user_id) }; 

    @primary @observable @foreign user_id: string;
    @primary @observable id: string;
    @observable @jsonfield entries: Log_Entry[];
    @observable @jsonfield labels: Log_Label;

    protected static Store: typeof Store = LogStore;

    constructor (defaults: {user_id: string, id: string, [extra: string]: any }, ...args) { super(defaults, ...args); } 

}

export class Log_Entry extends Submodel
{
    @observable message: string;
    @observable severity: string;
    @observable timestamp: Time;
}

export class Log_Label extends Submodel
{
    @observable device?: string;
    @observable service?: string;
}

export class UserPost extends Model 
{
    @resolver get user(): User { return UserStore.getbyId(this.user_id) }; 

    @primary @observable @foreign user_id: string;
    @primary @observable id: string;
    @observable body: string;
    @observable starCount: int;
    @observable @jsonfield stars: UserPost_Star[];
    @observable title: string;
    @observable uid: User;

    protected static Store: typeof Store = UserPostStore;

    constructor (defaults: {user_id: string, id: string, [extra: string]: any }, ...args) { super(defaults, ...args); } 

}

export class UserPost_Star extends Submodel
{
    @observable id: string;
    @observable item_value: boolean;
}


/* **************************
 * ORG-BASED MODELS
 * ************************** */
    
export class OrgUser extends Model 
{
    @resolver get org(): Org { return OrgStore.getbyId(this.org_id) }; 
    @resolver get user(): User { return UserStore.getbyId(this.user_id) }; 

    @primary @observable @foreign org_id: string;
    @primary @observable @foreign user_id: string;
    @primary @observable role_id: EnumConfigRole;
    @observable item_value: boolean;

    protected static Store: typeof Store = OrgUserStore;

    constructor (defaults: {org_id: string, user_id: string, role_id: string, [extra: string]: any }, ...args) { super(defaults, ...args); } 

}

/* **************************
 * ENUMS
 * ************************** */
    
export enum EnumPeriod
{
        allTime = "allTime",
        day = "day",
        week = "week",
        month = "month",
        quarter = "quarter",
        year = "year"
}

export enum EnumConfigRole
{
        consumer = "consumer",
        admin = "admin",
        supervisor = "supervisor",
        demo = "demo"
}

/* **************************
 * EXPORTS
 * ************************** */
    
export const stores = { AnalyticsStore, AwesomeLinkStore, GraphStateStore, ChatStore, LogStore, PostStore, UserPostStore, UserStore, OrgStore, OrgUserStore };

export const models = { Analytics, AwesomeLink, GraphState, Chat, Log, Post, UserPost, User, Org, OrgUser };
