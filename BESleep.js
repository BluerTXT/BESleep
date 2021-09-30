// Hi, this plugin is called BESleep
//██████╗░███████╗░██████╗██╗░░░░░███████╗███████╗██████╗░
//██╔══██╗██╔════╝██╔════╝██║░░░░░██╔════╝██╔════╝██╔══██╗
//██████╦╝█████╗░░╚█████╗░██║░░░░░█████╗░░█████╗░░██████╔╝
//██╔══██╗██╔══╝░░░╚═══██╗██║░░░░░██╔══╝░░██╔══╝░░██╔═══╝░
//██████╦╝███████╗██████╔╝███████╗███████╗███████╗██║░░░░░
//╚═════╝░╚══════╝╚═════╝░╚══════╝╚══════╝╚══════╝╚═╝░░░░░
//This plugin was created for the BeEarth server, but you can use it
let online = 0 //online players
let sleepingpl = [] //Sleeping players
let percentage = 50 //% sleeping players(сustomize it to your liking) (Yes, the config is not in json)
mc.listen('onJoin', function(pl) {
    online++
})
mc.listen('onLeft', function(pl) {
    online--
    let plsl = sleepingpl.indexOf(pl.realName)
    if(plsl >= 0) {
        sleepingpl.splice(plsl, 1)
    }
})
mc.listen('onUseItemOn', function(pl, it, bl) {
    if(bl.name == 'minecraft:bed') {
        let NBT = JSON.stringify(bl.getBlockState())
        if(NBT[49] == 0){
            mc.listen('onBlockInteracted', function(pl, bl) {
                if(bl.name == 'minecraft:bed') {
                    let plsl = sleepingpl.indexOf(pl.realName)
                    if(plsl == -1) {
                        let NBT = JSON.stringify(bl.getBlockState())
                        if(NBT[49] == 1){
                            sleepingpl.push(pl.realName)
                            setTimeout(function(){
                                let cmd = mc.runcmdEx('weather query')
                                if(String(cmd.output.substr(17)) == 'clear') {
                                    let sleeplen = sleepingpl.length
                                    if ((100/online)*sleeplen >= percentage) {
                                        mc.runcmdEx('time set 0')
                                    }
                                }
                                else {
                                    let sleeplen = sleepingpl.length
                                    if ((100/online)*sleeplen >= percentage) {
                                        mc.runcmdEx('time set 0')
                                        mc.runcmdEx('weather clear 13000')
                                    }
                                }
                            }, 5000)
                        }
                    }
                    else {
                        sleepingpl.splice(plsl, 1)
                        let NBT = JSON.stringify(bl.getBlockState())
                        if(NBT[49] == 1){
                            sleepingpl.push(pl.realName)
                            setTimeout(function(){
                                let cmd = mc.runcmdEx('weather query')
                                if(String(cmd.output.substr(17)) == 'clear') {
                                    let sleeplen = sleepingpl.length
                                    if ((100/online)*sleeplen >= percentage) {
                                        mc.runcmdEx('time set 0')
                                    }
                                }
                                else {
                                    let sleeplen = sleepingpl.length
                                    if ((100/online)*sleeplen >= percentage) {
                                        mc.runcmdEx('time set 0')
                                        mc.runcmdEx('weather clear 13000')
                                    }
                                }
                            }, 5000)
                        }
                    }
                }
            })
        }
    }
})
mc.listen('onMove', function(pl) {
    let plsl = sleepingpl.indexOf(pl.realName)
    if(plsl >= 0) {
        sleepingpl.splice(plsl, 1)
    }
})