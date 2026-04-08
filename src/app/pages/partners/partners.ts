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
    { src: '/icons/partners/mr_a.svg', alt: 'MR_A', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/jm_poultry.svg', alt: 'JM_POULTRY', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/sonnets.svg', alt: 'SONNETS', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-meta)]' },
    { src: '/icons/partners/ocean101.svg', alt: 'OCEAN101', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-meta)]' },
    { src: '/icons/partners/luna_libro.svg', alt: 'LUNA_LIBRO', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-meta)]' },
    { src: '/icons/partners/fur_paws.svg', alt: 'FUR_PAWS', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-meta)]' },
    { src: '/icons/partners/cafe_luke.svg', alt: 'CAFE_LUKE', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-meta)]' },
    { src: '/icons/partners/sgd_tacloban.svg', alt: 'SGD_TACLOBAN', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-meta)]' },
    { src: '/icons/partners/ronaldtesa.svg', alt: 'RONALDTESA', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-meta)]' },
    { src: '/icons/partners/mec.svg', alt: 'MEC', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-meta)]' },
    { src: '/icons/partners/big_brew.svg', alt: 'BIG_BREW', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-meta)]' },
    { src: '/icons/partners/nutricare.svg', alt: 'NUTRICARE', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-meta)]' },
    { src: '/icons/partners/bakoo.svg', alt: 'BAKOO', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-white)]' },
    { src: '/icons/partners/elora_supermarket.svg', alt: 'ELORA', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-white)]', sizeClass: 'keep-original-color' },
    { src: '/icons/partners/soy&bean.svg', alt: 'SOY&BEAN', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/ap_residences.svg', alt: 'AP_RESIDENCES', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/han_pork.svg', alt: 'HAN_PORK', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/handuraw_pizza.svg', alt: 'HANDURAW_PIZZA', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/smoque.svg', alt: 'SMOQUE', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/purchasers.svg', alt: 'PURCHASERS', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/dan_enrico.svg', alt: 'DAN_ENRICO', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/durhan.svg', alt: 'DURHAN', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/happilen_diner.svg', alt: 'HAPPILEN_DINER', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/prime_global.svg', alt: 'PRIME_GLOBAL', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/sanjo_medipharma.svg', alt: 'SANJO_MEDIPHARMA', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/color_ideas.svg', alt: 'COLOR_IDEAS', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/green_kiosk.svg', alt: 'GREEN_KIOSK', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/mylora_agrivet.svg', alt: 'MYLORA_AGRIVET', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/medisential.svg', alt: 'MEDISENTIAL', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/manarang_vergara.svg', alt: 'MANARANG_VERGARA', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/ambiance.svg', alt: 'AMBIENCE', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/abomar.svg', alt: 'ABOMAR', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/cebu_microasia.svg', alt: 'CEBU_MICROASIA', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/mf_computer.svg', alt: 'MF_COMPUTER', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    
    { src: '/icons/partners/happilen_diner.svg', alt: 'HAPPILEN_DINER', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/happilen_diner.svg', alt: 'HAPPILEN_DINER', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/happilen_diner.svg', alt: 'HAPPILEN_DINER', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/happilen_diner.svg', alt: 'HAPPILEN_DINER', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/happilen_diner.svg', alt: 'HAPPILEN_DINER', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/happilen_diner.svg', alt: 'HAPPILEN_DINER', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/happilen_diner.svg', alt: 'HAPPILEN_DINER', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/happilen_diner.svg', alt: 'HAPPILEN_DINER', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/happilen_diner.svg', alt: 'HAPPILEN_DINER', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/happilen_diner.svg', alt: 'HAPPILEN_DINER', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/happilen_diner.svg', alt: 'HAPPILEN_DINER', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/happilen_diner.svg', alt: 'HAPPILEN_DINER', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
    { src: '/icons/partners/happilen_diner.svg', alt: 'HAPPILEN_DINER', glowClass: 'hover:drop-shadow-[0_0_20px_var(--glow-primary)]' },
  
  ].map((logo) => ({ ...logo, sizeClass: 'keep-original-color' }));
  activeIndex = 0;
  @ViewChild('resultsSlider') resultsSliderRef?: ElementRef<HTMLElement>;
  @ViewChild('slider') sliderRef?: ElementRef<HTMLElement>;
  private resultsAutoScrollTimer: ReturnType<typeof setInterval> | null = null;
  private autoScrollTimer: ReturnType<typeof setInterval> | null = null;
  private hoverSlideTimer: ReturnType<typeof setInterval> | null = null;
  private hoverDirection: 'left' | 'right' | null = null;

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
    this.stopHoverSlide();
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

  pauseResultsAutoScroll() {
    this.stopResultsAutoScroll();
  }

  onResultsMouseLeave() {
    this.stopHoverSlide();
    this.startResultsAutoScroll();
  }

  pauseAutoScroll() {
    this.stopAutoScroll();
  }

  onSliderMouseLeave() {
    this.stopHoverSlide();
    this.startAutoScroll();
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

  handleHoverSlide(event: MouseEvent, el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    const pointerX = event.clientX - rect.left;
    const edgeZone = Math.min(120, rect.width * 0.2);

    if (pointerX <= edgeZone) {
      this.startHoverSlide('left', el);
      return;
    }

    if (pointerX >= rect.width - edgeZone) {
      this.startHoverSlide('right', el);
      return;
    }

    this.stopHoverSlide();
  }

  startHoverSlide(direction: 'left' | 'right', el: HTMLElement) {
    if (this.hoverDirection === direction && this.hoverSlideTimer) {
      return;
    }

    this.stopHoverSlide();
    this.hoverDirection = direction;
    this.slideOneCard(direction, el);

    this.hoverSlideTimer = setInterval(() => {
      this.slideOneCard(direction, el);
    }, 700);
  }

  stopHoverSlide() {
    if (this.hoverSlideTimer) {
      clearInterval(this.hoverSlideTimer);
      this.hoverSlideTimer = null;
    }

    this.hoverDirection = null;
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

  private slideOneCard(direction: 'left' | 'right', el: HTMLElement) {
    const cardWidth = el.querySelector('div')?.clientWidth || 288;
    const gap = 24;
    const step = cardWidth + gap;
    const isResultsSlider = el === this.resultsSliderRef?.nativeElement;
    const isActionSlider = el === this.sliderRef?.nativeElement;
    const totalCards = isResultsSlider
      ? this.resultsCards.length
      : isActionSlider
        ? this.actionCards.length
        : 0;

    if (totalCards > 0) {
      const cycleWidth = totalCards * step;

      if (cycleWidth > 0) {
        let nextLeft = direction === 'right' ? el.scrollLeft + step : el.scrollLeft - step;

        while (nextLeft < 0) {
          nextLeft += cycleWidth;
        }

        while (nextLeft >= cycleWidth) {
          nextLeft -= cycleWidth;
        }

        el.scrollTo({
          left: nextLeft,
          behavior: 'smooth'
        });
        return;
      }
    }

    const maxScrollLeft = Math.max(0, el.scrollWidth - el.clientWidth);

    const nextLeft =
      direction === 'right'
        ? Math.min(el.scrollLeft + step, maxScrollLeft)
        : Math.max(el.scrollLeft - step, 0);

    el.scrollTo({
      left: nextLeft,
      behavior: 'smooth'
    });
  }
}
