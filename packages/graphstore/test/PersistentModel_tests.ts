import { configure, autorun, action, reaction, IReactionDisposer } from 'mobx'
import {
  Model,
  GraphStoreFirebase,
  IFireDatabase,
  GraphStoreMemory,
  toJS,
  push,
  IEnhancedObservableArray
} from '@besync/graphstore'
import {
  stores,
  EnumConfigRole,
  OrgUser,
  mockData
} from '@besync/graphstore-test-mockdata'
import * as fs from 'fs'
import * as path from 'path'
import * as admin from 'firebase-admin'

configure({ enforceActions: 'observed' })

var DatabaseCases = []

// Firebase Setup
if (
  fs.existsSync(path.resolve(__dirname, '../../../../firebase.secrets.json'))
) {
  var config = require('../../../../firebase.secrets.json')
  admin.initializeApp({
    credential: admin.credential.cert(config),
    databaseURL: `https://${config.project_id}.firebaseio.com`
  })
  var fb = admin.database() as IFireDatabase
  DatabaseCases.push(new GraphStoreFirebase(fb))
}

// In Memory Database Setup
DatabaseCases.push(new GraphStoreMemory(mockData()))

DatabaseCases.forEach(db => {
  describe(db.constructor['name'], () => {
    Model.setDefaultStore(db)

    it('should get item and collection', done => {
      var orgUser: OrgUser = stores.OrgUserStore.getbyId(
        'dunder-mifflin',
        'google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0',
        'admin'
      )
      var callbackno: number = 0
      var r1: IReactionDisposer

      reaction(
        function() {
          return {
            0: orgUser.item_value,
            1: orgUser.org.roles,
            2: orgUser.org.name,
            3: toJS(orgUser.org.orgUsers),
            4: orgUser.loading,
            5: orgUser.org.orgUsers['loading'].value
          }
        },
        (_, r) => {
          callbackno++

          switch (callbackno) {
            case 1:
              expect(orgUser.item_value).toBeNull()
              expect(orgUser.org.roles).toBeNull()
              expect(orgUser.org.name).toBeNull()
              expect(toJS(orgUser.org.orgUsers)).toMatchObject([])
              expect(orgUser.loading).toBe(true)
              break
            case 3:
              expect(orgUser.loading).toBe(false)
              expect(orgUser.org.orgUsers['loading'].value).toBe(true)
              expect(orgUser.item_value).toBe(true)
              expect(toJS(orgUser.org.roles)).toMatchObject({
                admin: true,
                consumer: true,
                demo: true,
                supervisor: true
              })
              expect(orgUser.org.name).toBe('Dunder Mifflin')
              expect(toJS(orgUser.org.orgUsers)).toMatchObject([])
              break
            case 4:
              expect(orgUser.org.orgUsers['loading'].value).toBe(false)
              expect(orgUser.item_value).toBe(true)
              expect(toJS(orgUser.org.roles)).toMatchObject({
                admin: true,
                consumer: true,
                demo: true,
                supervisor: true
              })
              expect(orgUser.org.name).toBe('Dunder Mifflin')
              var users = toJS(orgUser.org.orgUsers)
              expect(users.length).toBe(3)
              expect(users[0]).toMatchObject({
                org_id: 'dunder-mifflin',
                user_id: 'google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0',
                role_id: 'admin',
                item_value: true
              })
              expect(users[1]).toMatchObject({
                org_id: 'dunder-mifflin',
                user_id: 'google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0',
                role_id: 'consumer',
                item_value: true
              })
              expect(users[2]).toMatchObject({
                org_id: 'dunder-mifflin',
                user_id: 'google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0',
                role_id: 'supervisor',
                item_value: true
              })
              expect(orgUser.loading).toBe(false)
              r.dispose()
              done()
              break
            default:
              expect(callbackno <= 4).toBe(true)
          }
        },
        { fireImmediately: true }
      )
    })

    it('should create record', done => {
      var orgUser = stores.OrgUserStore.getbyId(
        'dunder-mifflin',
        'google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0',
        'admin'
      )

      var callbackno: number = 0

      var r1: IReactionDisposer

      reaction(
        function() {
          return {
            0: orgUser.item_value,
            1: orgUser.org.roles,
            2: orgUser.org.name,
            3: toJS(orgUser.org.orgUsers),
            4: orgUser.loading,
            5: orgUser.org.orgUsers['loading'].value
          }
        },
        (_, r) => {
          callbackno++

          switch (callbackno) {
            case 1:
              expect(orgUser.item_value).toBeNull()
              expect(orgUser.org.roles).toBeNull()
              expect(orgUser.org.name).toBeNull()
              expect(toJS(orgUser.org.orgUsers)).toMatchObject([])
              expect(orgUser.loading).toBe(true)
              expect(orgUser.org.orgUsers['loading'].value).toBe(true)
              break
            case 3:
              expect(orgUser.org.orgUsers['loading'].value).toBe(true)
              var users = toJS(orgUser.org.orgUsers)
              expect(users.length).toBe(0)
              break
            case 4:
              expect(orgUser.org.orgUsers['loading'].value).toBe(false)
              var users = toJS(orgUser.org.orgUsers)
              expect(users.length).toBe(3)
              var item = push(orgUser.org.orgUsers as IEnhancedObservableArray<
                OrgUser
              >)
              r1 = autorun(() => item.user_id)
              setTimeout(
                action(() => {
                  item.user_id = 'us-east-1:d000000e-0000-0000-0000-00000000000'
                  item.role_id = EnumConfigRole.consumer
                  item.item_value = true
                }),
                200
              )

              break
            case 5:
              var users = toJS(orgUser.org.orgUsers)
              expect(users.length).toBe(4)
              expect(users[0]).toMatchObject({
                org_id: 'dunder-mifflin',
                user_id: 'google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0',
                role_id: 'admin',
                item_value: true
              })
              expect(users[1]).toMatchObject({
                org_id: 'dunder-mifflin',
                user_id: 'google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0',
                role_id: 'consumer',
                item_value: true
              })
              expect(users[2]).toMatchObject({
                org_id: 'dunder-mifflin',
                user_id: 'google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0',
                role_id: 'supervisor',
                item_value: true
              })
              expect(users[3]).toMatchObject({
                org_id: 'dunder-mifflin',
                user_id: 'us-east-1:d000000e-0000-0000-0000-00000000000',
                role_id: 'consumer',
                item_value: true
              })
              r.dispose()
              r1()
              done()
              break
            default:
              expect(callbackno <= 5).toBe(true)
          }
        },
        { fireImmediately: true }
      )
    })

    it('should delete previously created record', done => {
      var orgUser = stores.OrgUserStore.getbyId(
        'dunder-mifflin',
        'google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0',
        'admin'
      )

      var callbackno: number = 0
      var r1: IReactionDisposer, item

      reaction(
        function() {
          return {
            0: orgUser.item_value,
            1: orgUser.org.roles,
            2: orgUser.org.name,
            3: toJS(orgUser.org.orgUsers),
            6: orgUser.org.orgUsers.length,
            4: orgUser.loading,
            5: orgUser.org.orgUsers['loading'].value
          }
        },
        (_, r) => {
          callbackno++

          switch (callbackno) {
            case 1:
              expect(orgUser.item_value).toBeNull()
              expect(orgUser.org.roles).toBeNull()
              expect(orgUser.org.name).toBeNull()
              expect(toJS(orgUser.org.orgUsers)).toMatchObject([])
              expect(orgUser.loading).toBe(true)
              expect(orgUser.org.orgUsers['loading'].value).toBe(true)
              break
            case 2:
              /* DEBOUNCED USING DELAY BELOW, SO SECOND CALL IS ALL FOUR ITEMS */

              var users = toJS(orgUser.org.orgUsers)
              expect(orgUser.org.orgUsers['loading'].value).toBe(false)
              expect(users.length).toBe(4)
              expect(users[0]).toMatchObject({
                org_id: 'dunder-mifflin',
                user_id: 'google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0',
                role_id: 'admin',
                item_value: true
              })
              expect(users[1]).toMatchObject({
                org_id: 'dunder-mifflin',
                user_id: 'google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0',
                role_id: 'consumer',
                item_value: true
              })
              expect(users[2]).toMatchObject({
                org_id: 'dunder-mifflin',
                user_id: 'google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0',
                role_id: 'supervisor',
                item_value: true
              })
              expect(users[3]).toMatchObject({
                org_id: 'dunder-mifflin',
                user_id: 'us-east-1:d000000e-0000-0000-0000-00000000000',
                role_id: 'consumer',
                item_value: true
              })

              var item = stores.OrgUserStore.getbyId(
                'dunder-mifflin',
                'us-east-1:d000000e-0000-0000-0000-00000000000',
                'consumer'
              )
              r1 = autorun(() => item.user_id)
              setTimeout(
                action(() => {
                  item.delete()
                }),
                200
              )

              break
            case 3:
              var users = toJS(orgUser.org.orgUsers)
              expect(users.length).toBe(3)
              expect(users[0]).toMatchObject({
                org_id: 'dunder-mifflin',
                user_id: 'google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0',
                role_id: 'admin',
                item_value: true
              })
              expect(users[1]).toMatchObject({
                org_id: 'dunder-mifflin',
                user_id: 'google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0',
                role_id: 'consumer',
                item_value: true
              })
              expect(users[2]).toMatchObject({
                org_id: 'dunder-mifflin',
                user_id: 'google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0',
                role_id: 'supervisor',
                item_value: true
              })
              r.dispose()
              r1()
              done()
              break
            default:
              expect(callbackno <= 3).toBe(true)
          }
        },
        { fireImmediately: true, delay: 10 }
      )
    })

    it('should update record', done => {
      var orgUser = stores.OrgUserStore.getbyId(
        'dunder-mifflin',
        'google-Jk0wcm5svSaBAU6Doh5UlPqBrZj1:0',
        'admin'
      )

      var callbackno: number = 0

      var _ = reaction(
        function() {
          return {
            0: orgUser.item_value,
            1: orgUser.org.roles,
            2: orgUser.org.name,
            3: toJS(orgUser.org.orgUsers),
            4: orgUser.loading,
            5: orgUser.org.orgUsers['loading'].value
          }
        },
        (_, r) => {
          callbackno++

          switch (callbackno) {
            case 1:
              expect(orgUser.item_value).toBeNull()
              expect(orgUser.org.roles).toBeNull()
              expect(orgUser.org.name).toBeNull()
              expect(toJS(orgUser.org.orgUsers)).toMatchObject([])
              expect(orgUser.loading).toBe(true)
              expect(orgUser.org.orgUsers['loading'].value).toBe(true)
              break
            case 2:
              expect(orgUser.loading).toBe(false)
              break
            case 3:
              expect(orgUser.org.loading).toBe(false)
              break
            case 4:
              expect(orgUser.org.orgUsers['loading'].value).toBe(false)
              var statuscallbackno = 0

              setTimeout(
                () =>
                  autorun(r1 => {
                    ++statuscallbackno
                    var _ = {
                      0: orgUser.org.name,
                      1: orgUser.org.status.executing
                    }

                    switch (statuscallbackno) {
                      case 1:
                        expect(toJS(orgUser.org.status.executing)).toBe(false)
                        break
                      case 2:
                        expect(toJS(orgUser.org.status.executing)).toBe(true)
                        break
                      case 3:
                        expect(toJS(orgUser.org.status.executing)).toBe(false) // FIRST UPDATE
                        break
                      case 4:
                        expect(toJS(orgUser.org.status.executing)).toBe(true)
                        break
                      case 5:
                        expect(toJS(orgUser.org.status.executing)).toBe(false) // SECOND UPDATE
                        r1.dispose()
                        done()
                        db.db.goOffline()
                        break
                      default:
                        expect(statuscallbackno <= 5).toBe(true)
                    }
                  }),
                200
              )

              setTimeout(
                action(() => {
                  orgUser.org.name = 'Dunder Munder'
                }),
                200
              )

              break
            case 5:
              expect(orgUser.item_value).toBe(true)
              expect(toJS(orgUser.org.roles)).toMatchObject({
                admin: true,
                consumer: true,
                demo: true,
                supervisor: true
              })
              expect(orgUser.org.name).toBe('Dunder Munder')
              expect(orgUser.loading).toBe(false)
              expect(orgUser.org.loading).toBe(false)
              expect(orgUser.org.orgUsers['loading'].value).toBe(false)
              setTimeout(
                action(() => {
                  orgUser.org.name = 'Dunder Mifflin'
                }),
                200
              )
              break
            case 6:
              expect(orgUser.org.name).toBe('Dunder Mifflin')
              r.dispose()
              break
            default:
              expect(callbackno <= 6).toBe(true)
          }
        },
        { fireImmediately: true }
      )
    })
  })
})
