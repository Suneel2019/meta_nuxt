export default function logout(context) {

  context.$store.dispatch("login/logout", context).then(() => {

    context.$router.push({name: 'index'});

  })

}
