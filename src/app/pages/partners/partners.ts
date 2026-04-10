import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for *ngFor and [class]
import { RouterLink } from '@angular/router';
import { Cta } from "../../components/cta/cta";

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [Cta, CommonModule, RouterLink],
  templateUrl: './partners.html',
  styleUrl: './partners.css',
})
export class Partners implements AfterViewInit, OnDestroy {
  // Array size should match the number of cards in your HTML
  partners = [1, 2, 3, 4, 5]; 
  resultsActiveIndex = 0;
  resultsCards = [
    { src: 'Images/results/luna_libro.jpg', alt: 'Luna Libro' },
    { src: 'Images/results/arv_minimart.jpg', alt: 'Arv Minimart' },
    { src: 'Images/results/shopway.jpg', alt: 'Shopway' },
    { src: 'Images/results/fur_paws.jpg', alt: 'Fur Paws' },
    { src: 'Images/results/combinido.jpg', alt: 'Combinido' },
    { src: 'Images/results/pach.jpg', alt: 'pach' },
    { src: 'Images/results/pach1.jpg', alt: 'pach1' },
    { src: 'Images/results/sgd_printa.jpg', alt: 'sgd_printa' },
    { src: 'Images/results/donjjang.jpg', alt: 'donjjang' },
    { src: 'Images/results/kaya_restaurant.jpg', alt: 'kaya_restaurant' },
    { src: 'Images/results/one_stop.jpg', alt: 'one_stop' },
    { src: 'Images/results/cafe_luke.jpg', alt: 'cafe_luke' },
    { src: 'Images/results/sgd_tacloban.jpg', alt: 'sgd_tacloban' },
    { src: 'Images/results/ronaldtesa.jpg', alt: 'ronaldtesa' },
    { src: 'Images/results/mandaue_electronics.jpg', alt: 'mandaue_electronics' },
    { src: 'Images/results/big_brew.jpg', alt: 'big_brew' },
    { src: 'Images/results/nutricare.jpg', alt: 'nutricare' },
    { src: 'Images/results/niv_amarah.jpg', alt: 'niv_amarah' },
    { src: 'Images/results/manong_berto.jpg', alt: 'manong_berto' },
    { src: 'Images/results/doo_gii.jpg', alt: 'doo_gii' },
    { src: 'Images/results/printa_sgd.jpg', alt: 'printa_sgd' },
    { src: 'Images/results/mfr_marketing.jpg', alt: 'mfr_marketing' },
    { src: 'Images/results/b1_restaurant.jpg', alt: 'b1_restaurant' },
    { src: 'Images/results/product_8.jpg', alt: 'product_8' },
    { src: 'Images/results/smoque_bistro.jpg', alt: 'smoque_bistro' },
    { src: 'Images/results/han_pork.jpg', alt: 'han_pork' },
    { src: 'Images/results/handuraw_pizza.jpg', alt: 'handuraw_pizza' },
    { src: 'Images/results/cebu_maritime.jpg', alt: 'cebu_maritime' },
    { src: 'Images/results/tag_minimart.jpg', alt: 'tag_minimart' },
    { src: 'Images/results/niv_247.jpg', alt: 'niv_247' },
    { src: 'Images/results/dahun_cafe.jpg', alt: 'dahun_cafe' },
    { src: 'Images/results/efg_holding.jpg', alt: 'efg_holding' },
    { src: 'Images/results/apple_a_day.jpg', alt: 'apple_a_day' },
    { src: 'Images/results/carlos_pharmacy.jpg', alt: 'carlos_pharmacy' },
    { src: 'Images/results/cafe_mini.jpg', alt: 'cafe_mini' },
    { src: 'Images/results/fur_paws_grooming.jpg', alt: 'fur_paws_grooming' },
    { src: 'Images/results/medilife_pharmacy.jpg', alt: 'medilife_pharmacy' },
    { src: 'Images/results/don_emilio.jpg', alt: 'don_emilio' },
    { src: 'Images/results/maystar.jpg', alt: 'maystar' },
    { src: 'Images/results/donjjang.jpg', alt: 'donjjang' },
    { src: 'Images/results/donjjang.jpg', alt: 'donjjang' },
    { src: 'Images/results/donjjang.jpg', alt: 'donjjang' },
    { src: 'Images/results/donjjang.jpg', alt: 'donjjang' },
    { src: 'Images/results/donjjang.jpg', alt: 'donjjang' },
    { src: 'Images/results/donjjang.jpg', alt: 'donjjang' },
  ];
  resultsLoopCards = [...this.resultsCards, ...this.resultsCards];
  actionCards = [
    { src: '/Images/team/group1.jpg', alt: 'Team' },
    { src: '/Images/team/group2.jpg', alt: 'Team' },
    { src: '/Images/team/group3.jpg', alt: 'Team' },
    { src: '/Images/team/group4.jpg', alt: 'Team' },
    { src: '/Images/team/group5.jpg', alt: 'Team' },
    { src: '/Images/team/group6.jpg', alt: 'Team' },
  ];
  actionLoopCards = [...this.actionCards, ...this.actionCards];
  selectedPreviewImage: { src: string; alt: string } | null = null;
  logos: Array<{ src: string; alt: string; glowClass: string; sizeClass?: string }> = [
    { src: '/icons/partners/tgp.svg', alt: 'TGP', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-syspro)]' },
    { src: '/icons/partners/cafe_de_acasia.svg', alt: 'CAFE_DE_ACASIA', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-white)]' },
    { src: '/icons/partners/casa_verde.svg', alt: 'CASA_VERDE', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-azure)]' },
    { src: '/icons/partners/fruitas.svg', alt: 'FRUITAS', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/mr_a.svg', alt: 'MR_A', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/jm_poultry.svg', alt: 'JM_POULTRY', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/soy&bean.svg', alt: 'SOY&BEAN', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/ap_residences.svg', alt: 'AP_RESIDENCES', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/han_pork.svg', alt: 'HAN_PORK', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/wagenborg_cafe.svg', alt: 'WAGENBORG_CAFE', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/handuraw_pizza.svg', alt: 'HANDURAW_PIZZA', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/papsys_bbq.svg', alt: 'PAPSYS_BBQ', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/barnoks.svg', alt: 'BARNOKS', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/balai_pandesal.svg', alt: 'BALAI_PANDESAL', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/irish_beautywellness.svg', alt: 'IRISH_BEAUTYWELLNESS', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/smoque.svg', alt: 'SMOQUE', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/purchasers.svg', alt: 'PURCHASERS', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/dan_enrico.svg', alt: 'DAN_ENRICO', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/executive_restobar.svg', alt: 'EXECUTIVE_RESTOBAR', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/ambiance.svg', alt: 'AMBIENCE', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/the_faultline.svg', alt: 'THE_FAULTLINE', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/wellnessland.svg', alt: 'WELLNESSLAND', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/sonnets.svg', alt: 'SONNETS', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-meta)]' },
    { src: '/icons/partners/tapawarma.svg', alt: 'TAPA_WARMA', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/tag_minimart.svg', alt: 'TAG_MINIMART', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/shopway.svg', alt: 'SHOPWAY', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/seoul_pharmacy.svg', alt: 'SEUL_PHARMACY', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/pach_pharmacy.svg', alt: 'PACH_PHARMACY', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/doo_ggi.svg', alt: 'Doo Ggi', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/donjjang.svg', alt: 'DONJJANG', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/dahon_cafe.svg', alt: 'DAHON_CAFE', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/cafe_mimi.svg', alt: 'CAFE_MIMI', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/mec.svg', alt: 'MEC', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-meta)]' },
    { src: '/icons/partners/big_brew.svg', alt: 'BIG_BREW', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-meta)]' },
    { src: '/icons/partners/nutricare.svg', alt: 'NUTRICARE', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-meta)]' },
    { src: '/icons/partners/bakoo.svg', alt: 'BAKOO', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-white)]' },
    { src: '/icons/partners/elora_supermarket.svg', alt: 'ELORA', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-white)]', sizeClass: 'keep-original-color' },
    { src: '/icons/partners/iae_corporation.svg', alt: 'IAE_CORPORATION', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/b_restaurant.svg', alt: 'B_RESTAURANT', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/durhan.svg', alt: 'DURHAN', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/happilen_diner.svg', alt: 'HAPPILEN_DINER', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/prime_global.svg', alt: 'PRIME_GLOBAL', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/sanjo_medipharma.svg', alt: 'SANJO_MEDIPHARMA', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/color_ideas.svg', alt: 'COLOR_IDEAS', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/cebu_marine_industry.svg', alt: 'CEBU_MARINE_INDUSTRY', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/medilife_pharmacy.svg', alt: 'MEDILIFE_PHARMACY', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/green_kiosk.svg', alt: 'GREEN_KIOSK', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/mylora_agrivet.svg', alt: 'MYLORA_AGRIVET', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/medisential.svg', alt: 'MEDISENTIAL', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/efg_holding.svg', alt: 'EFG_HOLDING', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/manarang_vergara.svg', alt: 'MANARANG_VERGARA', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/maystar_pharmacy.svg', alt: 'MAYSTAR_PHARMACY', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/abomar.svg', alt: 'ABOMAR', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/cebu_microasia.svg', alt: 'CEBU_MICROASIA', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/mf_computer.svg', alt: 'MF_COMPUTER', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/ocean101.svg', alt: 'OCEAN101', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-meta)]' },
    { src: '/icons/partners/amarah_minimart.svg', alt: 'AMARAH_MINIMART', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/sgd_tacloban.svg', alt: 'SGD_TACLOBAN', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-meta)]' },
    { src: '/icons/partners/ahmazing.svg', alt: 'AHMAZING', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/printa_graphic.svg', alt: 'PRINTA_GRAPHIC', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/printa_graphics_baybay.svg', alt: 'PRINTA_GRAPHICS_BAYBAY', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/manong_berto.svg', alt: 'MANONG_BERTO', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/ronaldtesa.svg', alt: 'RONALDTESA', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-meta)]' },
    { src: '/icons/partners/mfr_marketing.svg', alt: 'MFR_MARKETING', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/kaya_restaurant.svg', alt: 'KAYA_RESTAURANT', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/kaya_korean.svg', alt: 'KAYA_KOREAN', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/employees_multipurpose.svg', alt: 'EMPLOYEES_MULTIPURPOSE', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/kke.svg', alt: 'KKE', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/jdn_pharmacy.svg', alt: 'JDN_PHARMACY', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/sta_barbara.svg', alt: 'STA_BARBARA', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/store_24.svg', alt: 'STORE_24', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/jepoys_grill.svg', alt: 'JEPOYS_GRILL', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/jc_gardencafe.svg', alt: 'JC_GARDENCAFE', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/gemca.svg', alt: 'GEMCA', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/58_ave.svg', alt: '58_AVE', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/road_safe.svg', alt: 'ROAD_SAFE', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/yy_houseware.svg', alt: 'YY_HOUSEWARE', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/kalina_grocery.svg', alt: 'KALINA_GROCERY', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/parola.svg', alt: 'PAROLA', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/mist_mountain.svg', alt: 'MIST_MOUNTAIN', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/kenzen_trading.svg', alt: 'KENZEN_TRADING', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/alagri_pet.svg', alt: 'ALAGRI_PET', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/libres_pharmacy.svg', alt: 'LIBRES_PHARMACY', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/maple.svg', alt: 'MAPLE', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/new_sacredheart.svg', alt: 'NEW_SACREDHEART', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/dcp_protech.svg', alt: 'DCP_PROTECH', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/an_office.svg', alt: 'AN_OFFICE', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/oneaid_pharmacy.svg', alt: 'ONEAID_PHARMACY', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/m&r_community.svg', alt: 'M&R_COMMUNITY', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/garden_envy.svg', alt: 'GARDEN_ENVY', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/canete_pharmacy.svg', alt: 'CANETE_PHARMACY', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/kmart_24.svg', alt: 'Kmart_24', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/vig_hardware.svg', alt: 'VIG_HARDWARE', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/chris_pharmacy.svg', alt: 'CHRIS_PHARMACY', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/cabs_care.svg', alt: 'CABS_CARE', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/thai_boran.svg', alt: 'THAI_BORAN', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/12k_ktv.svg', alt: '12K_KTV', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/siargao_bleu.svg', alt: 'SIARIAO_BLEU', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/58_mart.svg', alt: '58_MART', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/wok_remedy.svg', alt: 'WOK_REMEDY', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/red_lotus.svg', alt: 'RED_LOTUS', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/cpils.svg', alt: 'CPILS', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/entings_special.svg', alt: 'ENTINGS_SPECIAL', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/lm_metrohotel.svg', alt: 'LM_METROHOTEL', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },  
    { src: '/icons/partners/phil_mart.svg', alt: 'PHIL_MART', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/above_sealevel.svg', alt: 'ABOVE_SEALEVEL', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/chensanyama.svg', alt: 'CHENSANYAMA', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },  
    { src: '/icons/partners/cellucrete.svg', alt: 'CELLUCRETE', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/datu.svg', alt: 'DATU', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/jmec_trading.svg', alt: 'JMEC_TRADING', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/luna_libro.svg', alt: 'LUNA_LIBRO', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-meta)]' },
    { src: '/icons/partners/fur_paws.svg', alt: 'FUR_PAWS', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-meta)]' },
    { src: '/icons/partners/cafe_luke.svg', alt: 'CAFE_LUKE', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-meta)]' },
    { src: '/icons/partners/irish_beauty.svg', alt: 'IRISH_BEAUTY', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/buddies_point.svg', alt: 'BUDDIES_POINT', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/surigao_pet_doctors.svg', alt: 'SURIGAO_PET_DOCTORS', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/bigj_grocery.svg', alt: 'BIGJ_GROCERY', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/the_celtic.svg', alt: 'THE_CELTIC', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/niv.svg', alt: 'NIV', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },

  
  ];
  activeIndex = 0;
  @ViewChild('resultsSlider') resultsSliderRef?: ElementRef<HTMLElement>;
  @ViewChild('slider') sliderRef?: ElementRef<HTMLElement>;
  private resultsAutoScrollTimer: ReturnType<typeof setInterval> | null = null;
  private autoScrollTimer: ReturnType<typeof setInterval> | null = null;

  openImagePreview(src: string, alt: string) {
    this.selectedPreviewImage = { src, alt };
  }

  closeImagePreview() {
    this.selectedPreviewImage = null;
  }

  ngAfterViewInit() {
    this.startResultsAutoScroll();
    this.startAutoScroll();
  }

  ngOnDestroy() {
    this.stopResultsAutoScroll();
    this.stopAutoScroll();
  }

  updateResultsDots(el: HTMLElement) {
    const cardWidth = el.querySelector('div')?.clientWidth || 288;
    const gap = 24;
    const step = cardWidth + gap;
    const totalCards = this.resultsCards.length;

    if (totalCards <= 0 || step <= 0) {
      this.resultsActiveIndex = 0;
      return;
    }

    const cycleWidth = totalCards * step;
    const normalizedScrollLeft = cycleWidth > 0 ? el.scrollLeft % cycleWidth : el.scrollLeft;

    this.resultsActiveIndex = Math.round(normalizedScrollLeft / step) % totalCards;
  }

  scrollResultsToIndex(index: number, el: HTMLElement) {
    const cardWidth = el.querySelector('div')?.clientWidth || 288;
    const gap = 24;
    const totalCards = this.resultsCards.length;

    if (totalCards <= 0) {
      return;
    }

    const normalizedIndex = ((index % totalCards) + totalCards) % totalCards;

    el.scrollTo({
      left: normalizedIndex * (cardWidth + gap),
      behavior: 'smooth'
    });
  }

  updateDots(el: HTMLElement) {
    const cardWidth = el.querySelector('div')?.clientWidth || 288; // w-72 is 288px
    const gap = 24; // gap-6 is 24px
    const step = cardWidth + gap;
    const totalCards = this.actionCards.length;

    if (totalCards <= 0 || step <= 0) {
      this.activeIndex = 0;
      return;
    }

    const cycleWidth = totalCards * step;
    const normalizedScrollLeft = cycleWidth > 0 ? el.scrollLeft % cycleWidth : el.scrollLeft;

    this.activeIndex = Math.round(normalizedScrollLeft / step) % totalCards;
  }

  scrollToIndex(index: number, el: HTMLElement) {
    const cardWidth = el.querySelector('div')?.clientWidth || 288;
    const gap = 24;
    const totalCards = this.actionCards.length;

    if (totalCards <= 0) {
      return;
    }

    const normalizedIndex = ((index % totalCards) + totalCards) % totalCards;

    el.scrollTo({
      left: normalizedIndex * (cardWidth + gap),
      behavior: 'smooth'
    });
  }

  private startResultsAutoScroll() {
    const el = this.resultsSliderRef?.nativeElement;
    const totalCards = this.resultsCards.length;

    if (!el || totalCards === 0) {
      return;
    }

    this.stopResultsAutoScroll();

    this.resultsAutoScrollTimer = setInterval(() => {
      const cardWidth = el.querySelector('div')?.clientWidth || 288;
      const gap = 24;
      const step = cardWidth + gap;
      const cycleWidth = totalCards * step;

      if (cycleWidth <= 0 || el.scrollWidth <= el.clientWidth) {
        return;
      }

      const nextLeft = el.scrollLeft + 3;

      if (nextLeft >= cycleWidth) {
        el.scrollLeft = nextLeft - cycleWidth;
      } else {
        el.scrollLeft = nextLeft;
      }

      this.updateResultsDots(el);
    }, 20);
  }

  private stopResultsAutoScroll() {
    if (!this.resultsAutoScrollTimer) {
      return;
    }

    clearInterval(this.resultsAutoScrollTimer);
    this.resultsAutoScrollTimer = null;
  }

  private startAutoScroll() {
    const el = this.sliderRef?.nativeElement;
    const totalCards = this.actionCards.length;

    if (!el || totalCards === 0) {
      return;
    }

    this.stopAutoScroll();

    this.autoScrollTimer = setInterval(() => {
      const cardWidth = el.querySelector('div')?.clientWidth || 288;
      const gap = 24;
      const step = cardWidth + gap;
      const cycleWidth = totalCards * step;

      if (cycleWidth <= 0) {
        return;
      }

      if (el.scrollWidth <= el.clientWidth) {
        return;
      }

      const nextLeft = el.scrollLeft + 3;

      if (nextLeft >= cycleWidth) {
        el.scrollLeft = nextLeft - cycleWidth;
      } else {
        el.scrollLeft = nextLeft;
      }

      this.updateDots(el);
    }, 20);
  }

  private stopAutoScroll() {
    if (!this.autoScrollTimer) {
      return;
    }

    clearInterval(this.autoScrollTimer);
    this.autoScrollTimer = null;
  }

}
