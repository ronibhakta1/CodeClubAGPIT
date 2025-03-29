import { TextShimmerWave } from '@/components/ui/text-shimmer-wave';

export function TextShimmerWaveBasic() {
    return (
        <TextShimmerWave className='font-mono text-sm' duration={1}>
            Scroll down to see the timeline
        </TextShimmerWave>
    );
}
