import { GraphStore, IFireDatabase } from './GraphStore'

/**
 * The implementation of a persistent graph store in the Firebase Realtime Database
 */
export class GraphStoreFirebase extends GraphStore {
  /**
   * constructor
   *
   * @param db a persistent store that implementes the Firebase Realtime Database V3 API
   */
  constructor(db: IFireDatabase) {
    super(db)
  }
}
