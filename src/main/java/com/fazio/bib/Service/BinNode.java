package com.fazio.bib.Service;

import com.fazio.bib.entity.GoogleScholar;

class BinNode {
    private GoogleScholar dato;
    private BinNode sinistro, destro;

    public BinNode(GoogleScholar dato, BinNode sinistro, BinNode destro) {
        this.dato = dato;
        this.sinistro = sinistro;
        this.destro = destro;
    }

    public GoogleScholar getDato() {
        return this.dato;
    }

    public BinNode getSinistro() {
        return this.sinistro;
    }

    public BinNode getDestro() {
        return this.destro;
    }

    public void SetSinistro(BinNode sinistro) {
        this.sinistro = sinistro;
    }

    public void SetDestro(BinNode destro) {
        this.destro = destro;
    }

    static void stampaTutti(BinNode a) {
        if (a == null)
            return;

        System.out.println(a.getDato());
        stampaTutti(a.getSinistro());
        stampaTutti(a.getDestro());
    }
}