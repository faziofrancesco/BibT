package com.fazio.bib.Service;

import com.fazio.bib.entity.GoogleScholar;
import javafx.util.Pair;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;

import java.util.ArrayList;


@Slf4j
public class ScrapingGoogleScholar1 {
    WebDriver driver;
    private ArrayList<Nodes> nodes = new ArrayList<>();
    private ArrayList<Links> links = new ArrayList<>();
    private ArrayList<String> titles = new ArrayList<>();
    private int prec;
    private int ris;
    ArrayList<Pair<Integer, Boolean>> visitati = new ArrayList<>();
    private ArrayList<Integer> ids = new ArrayList<>();
    private boolean closeRoot = false;

    public ScrapingGoogleScholar1() throws InterruptedException {


        System.setProperty("webdriver.gecko.driver", "src/main/resources/geckodriver.exe");
        FirefoxOptions options = new FirefoxOptions();
        options.addArguments("--window-size=1920,1200", "--ignore-certificate-errors", "--disable-extensions");
        driver = new FirefoxDriver(options);
        driver.manage().window().setPosition(new Point(0, 0));
        driver.manage().window().setSize(new Dimension(1920 / 2, 1200));
        driver.get("https://scholar.google.com/");

        Thread.sleep(2000);

    }

    public void SetTitle(String Title) throws InterruptedException {
        Thread.sleep(2000);
        driver.findElement(By.xpath("//*[@id=\"gs_hdr_tsi\"]")).sendKeys(Title);
        driver.findElement(By.xpath("//*[@id=\"gs_hdr_tsb\"]/span/span[1]")).click();
    }


    public GoogleScholar FirstResult(Integer Result) throws InterruptedException {
        String r = Result.toString();
        if (driver.findElements(By.xpath("//div[@data-rp='" + r + "']")).size() == 0) {
            return null;
        }
        String titolo1 = driver.findElement(By.xpath("//div[@data-rp='" + r + "']/div[@class='gs_ri']/h3")).getText();
        String autori1 = driver.findElement(By.xpath("//div[@data-rp='" + r + "']/div[@class='gs_ri']/div[@class='gs_a']")).getText();
        String riassunto1 = null;
        if (driver.findElements(By.xpath("//div[@data-rp='" + r + "']/div[@class='gs_ri']/div[@class='gs_rs']")).size() != 0) {
            riassunto1 = driver.findElement(By.xpath("//div[@data-rp='" + r + "']/div[@class='gs_ri']/div[@class='gs_rs']")).getText();
        }

        return new GoogleScholar(titolo1, autori1, riassunto1);

    }

    /*
        padre
        figlio 1  e figlio 2 passo 0
        figlio 3 figlio 4 passo 1  vedere 2
        figlio 5 figlio 6 termino

     */
    public Integer prendere() {
        for (int i = 0; i < visitati.size(); i++) {
            if (visitati.get(i).getValue() == false) {
                for (int j = 1; j < nodes.size(); j++) {
                    if (visitati.get(i).getKey().toString().equalsIgnoreCase(nodes.get(j).getId())) {
                        Pair<Integer, Boolean> p = new Pair<>(visitati.get(i).getKey(), true);
                        visitati.set(i, p);
                        driver.get(nodes.get(j).getSite());
                        log.error(nodes.get(j).getId());
                        ris = Integer.parseInt(nodes.get(j).getNpage());
                        return Integer.valueOf(nodes.get(j).getId());
                    }
                }
            }
        }
        return 0;
    }

    public void mettere(Integer id) {

        Boolean cond = true;
        for (int i = 0; i < visitati.size(); i++) {
            if (visitati.get(i).getKey() == id) {
                cond = false;
                return;
            }
        }
        if (cond == true) {
            visitati.add(new Pair(id, false));
            return;
        }
    }

    public void Graph(int profondita, int risultati) throws InterruptedException {
        int var = 0;
        log.error(String.valueOf(risultati));
        log.error(String.valueOf(profondita));
        for (int k = 1; k < profondita; k++) {
            var += Math.pow(risultati, k);
            log.error(String.valueOf(var));
        }

        while (var > visitati.size()) {
            Integer cont1 = 0;
            while (risultati != cont1) {
                GoogleScholar gs = FirstResult(cont1);
                int id = 0;
                Nodes node = null;
                Links link = null;
                if (gs == null) {
                    id = 0;
                } else {
                    id = AssignId(gs.getTitle());
                }
                if (id != 0) {
                    node = new Nodes(Integer.toString(id), gs.getTitle(), gs.getAuthors(), gs.getIntroduction(), cont1.toString(), driver.getCurrentUrl());
                    link = new Links(Integer.toString(prec), Integer.toString(id));
                }
                if (IdExists(id) == false && id != 0) {
                    nodes.add(node);
                }
                if (link != null) {
                    links.add(link);
                }
                if (id != 0)
                    mettere(id);
                cont1++;
                log.error("sono nel while");
            }
            log.error("non sono nel while");

            prec = prendere();
            try {
                if (driver.findElement(By.xpath("//div[@data-rp='" + ris + "']/div[@class='gs_ri']/div[@class='gs_fl']/a[3]")).getText().contains("Citato") == true) {
                    driver.findElement(By.xpath("//div[@data-rp='" + ris + "']/div[@class='gs_ri']/div[@class='gs_fl']/a[3]")).click();
                }

            } catch (Exception e) {
                e.printStackTrace();
                if (driver.findElement(By.xpath("/html/body/div[1]/div[10]/div[2]/div/form/h1")).getText().contains("Dimostra di non essere un robot") == true) {
                    driver.close();
                    return;
                }
            }

        }
        driver.close();

    }

    public boolean IdExists(int id) {

        for (int i = 0; i < ids.size(); i++) {
            if (ids.get(i) == id) {
                return true;
            }
        }
        ids.add(id);
        return false;
    }

    public void Root() throws InterruptedException {

        Thread.sleep(2000);

        //Se la ricerca è vuota
        if (driver.findElements(By.xpath("//div[@data-rp='0']")).size() == 0) {
            closeRoot = true;
            driver.close();
            return;
        }

        String titolo = driver.findElement(By.xpath("//div[@data-rp='0']/div[@class='gs_ri']/h3")).getText();
        ;
        String autori = driver.findElement(By.xpath("//div[@data-rp='0']/div[@class='gs_ri']/div[@class='gs_a']")).getText();
        String riassunto = null;
        if (driver.findElements(By.xpath("//div[@data-rp='0']/div[@class='gs_ri']/div[@class='gs_rs']")).size() != 0) {
            riassunto = driver.findElement(By.xpath("//div[@data-rp='0']/div[@class='gs_ri']/div[@class='gs_rs']")).getText();
        }

        int id = AssignId(titolo);
        Nodes node = new Nodes(Integer.toString(id), titolo, autori, riassunto, "0", driver.getCurrentUrl());
        prec = id;
        nodes.add(node);
        ids.add(id);

        WebElement firstCitation = driver.findElement(By.xpath("//div[@data-rp='0']"));
        firstCitation.findElement(By.xpath("//div[@class='gs_ri']/div[@class='gs_fl']/a[3]")).click();

    }

    public int AssignId(String title) {

        if (titles.size() == 0) {
            titles.add(title);
            return 1;
        } else {
            for (int i = 0; i < titles.size(); i++) {
                if (titles.get(i).equals(title))
                    return i + 1;
            }
        }
        titles.add(title);

        return titles.size();
    }


    public void Scraping(int profondita, int risultati, String title) throws InterruptedException {

        this.SetTitle(title);
        this.Root();
        if (closeRoot != true)
            this.Graph(profondita, risultati);

    }

    public ArrayList<Nodes> GetNodes() {
        return nodes;
    }

    public ArrayList<Links> GetLinks() {
        return links;
    }


}
