
function func(option={}) {
    const {
        aaa= 1
    } = option

    console.log(aaa)
    aaa=33
}

func()
func({
    aaa:3
})
