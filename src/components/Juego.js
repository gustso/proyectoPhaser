import React from 'react';
import Phaser from 'phaser';
import { useState, useEffect } from 'react';
import Preload from './Preload';
import Play from './Play';
//import Escena from './Escena';

function Juego() {

    //uso state de una variable listo, si no usamos esto los lienzos se acumularan en la vista
    const [listo, setListo] = useState(false);

    //usamos el hook para que renderice acciones que react no hace
    useEffect(() => {

        //configuracion compartida con el resto de las escenas
        const CONFIGURACION = {
            scale: {
                autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
                width: 800,
                height: 600
            },
            posicionInicial: { x: 100, y: 50 },
            velocidadInical: -200,
        };

        const Escenas = [Preload, Play];
        const crearEscena = Scene => new Scene(CONFIGURACION);
        const iniciarEscena = () => Escenas.map(crearEscena);

        var config = {
            type: Phaser.AUTO,
            //scale: {
            //    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
            //    width: 800,
            //    height: 600
            //},
            ...CONFIGURACION,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: true
                }
            },
            scene: iniciarEscena()
            //scene: [Escena]
            //scene:[Preload, Create]
            //scene: {
            //    preload: preload,
            //    create: create
            //}
        };

        //arranca el juego
        var game = new Phaser.Game(config);

        // Trigger cuando el juego esta completamente listo
        game.events.on("LISTO", setListo);

        // Si no pongo esto, se acumulan duplicados del lienzo
        return () => {
            setListo(false);
            game.destroy(true);
        }

    }, [listo]);


}
export default Juego;