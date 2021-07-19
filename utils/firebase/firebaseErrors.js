// list of firebase error codes to alternate error messages

const firebaseErrors = {
  'auth/user-not-found': 'Geen gebruiker gevonden met dit email adres.',
  'auth/email-already-in-use': 'Dit email adres is al in gebruik.',
  'auth/wrong-password':
    'Verkeerd paswoord of de gebruiker heeft geen paswoord.',
  'auth/too-many-requests': 'Teveel foutieve pogingen, probeer later opnieuw.',
}

export default firebaseErrors
