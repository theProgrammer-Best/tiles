controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    grid.place(mySprite, grid.add(grid.getLocation(mySprite), 0, -1))
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (tiles.tileAtLocationEquals(grid.getLocation(mySprite), assets.tile`myTile`)) {
        tiles.setTileAt(grid.getLocation(mySprite).getNeighboringLocation(CollisionDirection.Left), list[loop(list.indexOf(tiles.tileImageAtLocation(grid.getLocation(mySprite).getNeighboringLocation(CollisionDirection.Left))), 1)])
        tiles.setTileAt(grid.getLocation(mySprite).getNeighboringLocation(CollisionDirection.Bottom), list[loop(list.indexOf(tiles.tileImageAtLocation(grid.getLocation(mySprite).getNeighboringLocation(CollisionDirection.Bottom))), 2)])
        tiles.setTileAt(grid.getLocation(mySprite), assets.tile`myTile1`)
    } else if (tiles.tileAtLocationEquals(grid.getLocation(mySprite), assets.tile`myTile0`)) {
        tiles.setTileAt(grid.getLocation(mySprite).getNeighboringLocation(CollisionDirection.Bottom), assets.tile`myTile1`)
        tiles.setTileAt(grid.getLocation(mySprite), assets.tile`myTile`)
        tiles.setTileAt(grid.getLocation(mySprite).getNeighboringLocation(CollisionDirection.Top), list[loop(list.indexOf(tiles.tileImageAtLocation(grid.getLocation(mySprite).getNeighboringLocation(CollisionDirection.Top))), 1)])
    } else {
        tiles.setTileAt(grid.getLocation(mySprite).getNeighboringLocation(CollisionDirection.Right), assets.tile`myTile1`)
        tiles.setTileAt(grid.getLocation(mySprite).getNeighboringLocation(CollisionDirection.Left), list[loop(list.indexOf(tiles.tileImageAtLocation(grid.getLocation(mySprite).getNeighboringLocation(CollisionDirection.Left))), 2)])
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    grid.place(mySprite, grid.add(grid.getLocation(mySprite), -1, 0))
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    grid.place(mySprite, grid.add(grid.getLocation(mySprite), 1, 0))
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    grid.place(mySprite, grid.add(grid.getLocation(mySprite), 0, 1))
})
function loop (num: number, num2: number) {
    num = num
    for (let index = 0; index < num2; index++) {
        if (num > 1) {
            num = 0
        } else {
            num += 1
        }
    }
    return num
}
let win = false
let num = 0
let list: Image[] = []
let mySprite: Sprite = null
mySprite = sprites.create(img`
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    1 . . . . . . . . . . . . . . 1 
    1 . . . . . . . . . . . . . . 1 
    1 . . . . . . . . . . . . . . 1 
    1 . . . . . . . . . . . . . . 1 
    1 . . . . . . . . . . . . . . 1 
    1 . . . . . . . . . . . . . . 1 
    1 . . . . . . . . . . . . . . 1 
    1 . . . . . . . . . . . . . . 1 
    1 . . . . . . . . . . . . . . 1 
    1 . . . . . . . . . . . . . . 1 
    1 . . . . . . . . . . . . . . 1 
    1 . . . . . . . . . . . . . . 1 
    1 . . . . . . . . . . . . . . 1 
    1 . . . . . . . . . . . . . . 1 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    `, SpriteKind.Player)
tiles.setCurrentTilemap(tilemap`level3`)
grid.snap(mySprite)
list = [tiles.tileImageAtLocation(tiles.getTileLocation(0, 0)), tiles.tileImageAtLocation(tiles.getTileLocation(1, 0)), tiles.tileImageAtLocation(tiles.getTileLocation(2, 0))]
for (let index = 0; index <= 6; index++) {
    for (let index2 = 0; index2 <= 9; index2++) {
        tiles.setTileAt(tiles.getTileLocation(index2, index), list._pickRandom())
    }
}
forever(function () {
    win = true
    for (let index = 0; index <= 6; index++) {
        for (let index2 = 0; index2 <= 9; index2++) {
            if (tiles.tileAtLocationEquals(tiles.getTileLocation(index2, index), assets.tile`myTile`)) {
                win = false
            }
        }
    }
    if (win) {
        pause(25)
        game.gameOver(true)
    }
    pause(50)
})
