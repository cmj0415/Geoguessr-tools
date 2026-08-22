import { getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { importFindThePlaceCatalog } from './importCatalog.js'

if (getApps().length === 0) initializeApp()

const summary = await importFindThePlaceCatalog(getFirestore())
process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`)
