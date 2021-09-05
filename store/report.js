export const state = () => ({
  reports: null,
})

export const mutations = {}

export const actions = {
  async addReport(context, payload) {
    console.log(payload)
    const report = payload
    console.log(report.general)
    if (report.general.media !== null) {
      await context.dispatch('uploadImage', this.report.media[0])
    }

    this.$fire.firestore
      .collection('report')
      .doc(this.$fire.auth.currentUser.uid)
      .collection('reports')
      .doc()
      .set(report)
      .then(() => {
        console.log('Added')
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
      })
  },
  async uploadImage(context, payload) {
    const file = payload
    const childPath = `report/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`

    const task = this.$fire.storage.ref().child(childPath).put(file)

    const taskProgress = (snapshot) => {
      console.log(`Transferred: ${snapshot.bytesTransferred}`)
    }

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        // savePostData(snapshot);
        console.log(snapshot)
      })
    }

    const taskError = (snapshot) => {
      console.log(snapshot)
    }

    task.on('state_changed', taskProgress, taskError, taskCompleted)
  },
}

export const getters = {}
