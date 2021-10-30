// Hi, this plugin is called BESleep
//██████╗░███████╗░██████╗██╗░░░░░███████╗███████╗██████╗░
//██╔══██╗██╔════╝██╔════╝██║░░░░░██╔════╝██╔════╝██╔══██╗
//██████╦╝█████╗░░╚█████╗░██║░░░░░█████╗░░█████╗░░██████╔╝
//██╔══██╗██╔══╝░░░╚═══██╗██║░░░░░██╔══╝░░██╔══╝░░██╔═══╝░
//██████╦╝███████╗██████╔╝███████╗███████╗███████╗██║░░░░░
//╚═════╝░╚══════╝╚═════╝░╚══════╝╚══════╝╚══════╝╚═╝░░░░░
let percentage = 50 //% sleeping players(сustomize it to your liking) (Yes, the config is not in json)
mc.listen('onBlockInteracted', function(pl, bl){
    if(bl.type == 'minecraft:bed'){
        if(Number(pl.getNbt().getTag("Sleeping").toString()) == 1){
            let pls = mc.getOnlinePlayers()
            let plslen = pls.length
            let sleepingpls = 0
            let act = false
            for(let i = 0;i < plslen;i++){
                if(Number(pls[i].getNbt().getTag("Sleeping").toString()) == 1){
                    sleepingpls++
                    if((100/plslen)*sleepingpls >= percentage){
                        act = true
                        break
                    }
                }
            }
            if(act == true){
                setTimeout(function(){
                    if(Number(pl.getNbt().getTag("Sleeping").toString()) == 1){
                        mc.runcmdEx('time set 0')
                        mc.runcmdEx('weather clear 13000')
                    }
                }, 5000)
            }
        }
    }
})
