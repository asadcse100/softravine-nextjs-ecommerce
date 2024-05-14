import { Builder } from 'your-builder-library'; // Import your builder library if you have one

interface ProviderRevoke {
  /**
   * Apply a given search value to the builder instance.
   * 
   * @param builder The builder instance
   * @param value The value to apply
   * @returns The modified builder instance
   */
  apply(builder: Builder, value: any): Builder;
}

export default ProviderRevoke;
